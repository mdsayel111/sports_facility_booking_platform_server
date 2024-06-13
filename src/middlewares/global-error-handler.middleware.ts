import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/zod.error";

// global error handle middleware
const globalErrorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    let status = 500
    // default error message
    let errObj = {
        "success": false,
        "message": "Something went wrong !",
        "errorMessages": [
            {
                "path": "",
                "message": "Something went wrong !"
            }

        ],
        "stack": ""
    }

    // if error comes from zod validation
    if (err instanceof ZodError) {
        // set status
        status = 403
        // pass err to zodErrorHandler function
        const newErrObj = zodErrorHandler(err)

        // get value of newErrObj by destructuring
        const { message, errorMessages, stack } = newErrObj

        // set value of errObj.message if message exist
        if (message) {
            errObj.message = message
        }

        // set value of errObj.errorMessages if errorMessages exist
        if (errorMessages) {
            errObj.errorMessages = errorMessages
        }

        // set value of errObj.stack if stack exist
        if (stack) {
            errObj.stack = stack
        }
    }

    // send response if any error occur
    res.status(status).send(errObj)
}

export default globalErrorHandleMiddleware