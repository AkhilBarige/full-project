import mailgen from "mailgen"
import dotenv from "dotenv"
dotenv.config()

import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new mailgen({
        theme: "default",
        product: {
            name: "task manager",
            link: "https://taskmanagelink.com"
        }
    })
    console.log("SMTP Host:", process.env.MAIL_TRAP_SMTP_HOST)
    console.log("SMTP Port:", process.env.MAIL_TRAP_SMTP_PORT)
    const emailText = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailhtml = mailGenerator.generate(options.mailgenContent)


    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_SMTP_HOST,
        port: process.env.MAIL_TRAP_SMTP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_SMTP_USERNAME,
            pass: process.env.MAIL_TRAP_SMTP_PASS,
        }


    })
    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailhtml
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("email service is failed . make sure that you entered the credentials properly in the .env file")
        console.error("error", error)
    }

}


const emailVerificationMail = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "HII,welcome to our app we are excited to have yoh on board",
            action: {
                instructions: "to verify click on the following button",
                button: {
                    color: "#666666",
                    text: "verify your email",
                    link: verificationUrl
                },

            },
            outro: "need help,feel free to mail us,hope you made it..."
        }
    }
}

const forgotPasswordMail = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "HII,reset your password now",
            action: {
                instructions: "to change the password click on the following button",
                button: {
                    color: "#454545",
                    text: "verify reset password",
                    link: passwordResetUrl
                },

            },
            outro: "need help,feel free to mail us,hope you made it..."
        }
    }
}

export {
    emailVerificationMail, forgotPasswordMail, sendEmail
}