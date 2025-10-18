import { User } from "../models/user models.js"
import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import { emailVerificationMail, forgotPasswordMail, sendEmail } from "../utils/mail.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";




async function generateAccessAndRefreshToken(userId) {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body
    const exsistedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (exsistedUser) {
        throw new ApiError(409, "User already exsists", [])
    }
    const user = await User.create({
        email, password, username, isEmailVerified: false,
    })

    const { unHashToken, hashToken, tokenExpiry } = user.generateTemporaryToken

    user.emailverificationToken = hashToken
    user.emailverificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })


    await sendEmail({
        email: user?.email,
        subject: "please verify your mail",
        mailgenContent: emailVerificationMail(user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashToken}`
        )
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailverificationToken -emailverificationExpiry")
    if (!createdUser) {
        throw new ApiError(500, "something went wrong in registration")

    }
    return res.status(201).json(
        new ApiResponse(
            200, { user: createdUser }, "sucess and mail sent"
        )
    )
})

const login = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body

    if (!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "user is required")
    }
    const isPasswordValid = user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(400, "password is invalid")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -emailverificationToken -emailverificationExpiry")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200, {
            user: loggedInUser,
            accessToken, refreshToken
        },
            "User logged in sucessful"
        )
    )

})

const logout = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: "" } },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched"))
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificatinToken } = req.params
    if (!verificatinToken) {
        throw new ApiError(405, "token for verification is missing")
    }
    let hashToken = crypto.createHash("sha256").update(verificatinToken).digest("hex")

    const user = await User.findOne({
        emailverificationToken: hashToken,
        emailverificationExpiry: { $gt: Date.now() }
    })

    if (!user) {
        throw new ApiError(400, "token invalid")
    }

    user.emailverificationToken = undefined
    user.emailverificationExpiry = undefined
    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, {
        isEmailVerified: true
    }, "email is verified"))
})


const resendEmailVerification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "user does not exsist")
    }
    if (user.isEmailVerified) {
        throw new ApiError(409, "email verified already")
    }


    const { unHashToken, hashToken, tokenExpiry } = user.generateTemporaryToken

    user.emailverificationToken = hashToken
    user.emailverificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })


    await sendEmail({
        email: user?.email,
        subject: "please verify your mail",
        mailgenContent: emailVerificationMail(user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashToken}`
        )
    })
    return res.status(200).json(new ApiResponse(200, {}, "mail sent again"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(404, "unauthorised access");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "expired refresh token");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        user.refreshToken = newRefreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, {
                accessToken,
                refreshToken: newRefreshToken
            }, "accessToken refreshed"));
    } catch (error) {
        throw new ApiError(401, "invalid refresh token");
    }
});

const forgotPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, " invalid user")
    }
    const { unHashToken, hashToken, tokenExpiry } = user.generateTemporaryToken

    user.forgotPasswordToken = hashToken
    user.forgotPasswordExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })


    await sendEmail({
        email: user?.email,
        subject: "pass-reset request",
        mailgenContent: forgotPasswordMail(user.username,
            `${process.env.V}/${unHashToken}`,),
    })
    return res.status(200).json(new ApiResponse(200, {}, "mail sent to reset pass"))


})


const resetFortgotPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params
    const { newPassword } = req.body

    let hashToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    const user = await User.findOne({
        forgotPasswordToken: hashToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })
    if (!user) {
        throw new ApiError(489, "token expired")
    }
    user.forgotPasswordExpiry = undefined
    user.forgotPasswordToken = undefined
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, {}, " reset pass sucess"))

})
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordValid) {
        throw new ApiError(400, "wrong pass")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, {}, " pass changed sucess"))
})
// const getCurrentUser = asyncHandler(async(req,res)=>{

// })

export { registerUser, login, logout, getCurrentUser, verifyEmail, resendEmailVerification, refreshAccessToken, forgotPasswordReset, changeCurrentPassword, resetFortgotPassword }