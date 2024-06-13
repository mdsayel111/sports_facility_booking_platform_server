import { RequestHandler } from "express"

// HOF for handle error of async function and avoid try catch repeat
const catchAsync = (fun: RequestHandler) => {
    // creat middleware for catch acync error
    const middleware: RequestHandler = async (req, res, next) => {
        try {
            // call the callback
            await fun(req, res, next)
        } catch (err) {
            // if any error occur when run callback fun, pass the error to global error handler
            next(err)
        }
    }

    // return the middleware
    return middleware
}

export default catchAsync
