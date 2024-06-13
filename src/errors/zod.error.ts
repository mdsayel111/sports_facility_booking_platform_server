import { ZodError } from "zod";
import { TErrObj } from "../interface/error-response";

// zod error handler
const zodErrorHandler = (err: ZodError) => {
    console.log(err.errors)
    // last index of err.errors[0].path array's
    const lastPathIndx = err.errors[0].path.length - 1

    // creat error object
    const errObj: TErrObj = {
        message: err.errors[0].message,
        errorMessages: [{ path: err.errors[0].path[lastPathIndx] as string, message: err.errors[0].message }],
        stack: err.stack || ""
    }

    // return errObj
    return errObj

}

export default zodErrorHandler