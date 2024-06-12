import { RequestHandler } from "express";
import authService from "./auth.service";
import sendResponse from "../../utils/send-response";

const registerUser: RequestHandler = async (req, res) => {
    // creat user
    const result = authService.creatUser(req.body)

    // if user created successfully
    if (result) {
        // send response
        sendResponse(res, {
            success: true,
            message: "User registered successfully",
            data: result
        })
    }
}

// auth controllers
const authControllers = {
    registerUser
}

export default authControllers