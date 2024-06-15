/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint  no-unused-vars: "error" */
import { ErrorRequestHandler } from "express";
import mongoose from 'mongoose';
import { ZodError } from "zod";
import mongooseValidationErrorHandler from '../error-handler/mongoose-validation-error-handler';
import zodErrorHandler from "../error-handler/zod.error-handler";
import { TErrorObj } from '../interface/error';
// import mongooseCastErrorHandler from "../error-handler/mongoose-cast-error-handler";
import mongooseDuplicateKeyErrorHandler from "../error-handler/mongoose-duplicate-key-error-handler";

// global error handle middleware
const globalErrorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    let status = 500

    // default errObj
    let errObj: TErrorObj = {
        "message": "Something went wrong !",
        "errorMessages": [
            {
                "path": "",
                "message": "Something went wrong !"
            }

        ],
        "stack": ""
    }

    let newErrorObj: null | TErrorObj = null

    // if error comes from zod validation
    if (err instanceof ZodError) {
        // set status
        status = 403

        // pass err to zodErrorHandler function
        newErrorObj = zodErrorHandler(err)
    }

    // if error comes for mongoose validation
    if (err instanceof mongoose.Error.ValidationError) {
        // pass err to mongooseValidationErrorHandler
        newErrorObj = mongooseValidationErrorHandler(err)
    }

    // -------> TODO : handle mongoose cast error <------
    // if error comes from mongoose cast error
    // if (err instanceof mongoose.Error.CastError) {
    //     // pass err to mongooseCastErrorHandler
    //     newErrorObj = mongooseCastErrorHandler(err)
    // }

    // if error comes from mongoose duplicate key error
    if (err.code === 11000) {
        // pass err to mongooseCastErrorHandler
        newErrorObj = mongooseDuplicateKeyErrorHandler(err)
    }

    // if newErrorObj is not null set errObj = newObj 
    if (newErrorObj) {
        errObj = newErrorObj
    }

    // send response if any error occur
    res.status(status).send({ success: false, ...errObj })
}

export default globalErrorHandleMiddleware