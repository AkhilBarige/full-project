import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthcheck = asyncHandler(async (_req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { message: "Server is running" }, "Healthcheck successful"));
});

export { healthcheck };