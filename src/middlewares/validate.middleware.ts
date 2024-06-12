/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { AnyZodObject, ZodEffects } from "zod";

// HOF for validate req.body by zod schema
const validateRequestBody = (schema: AnyZodObject | ZodEffects<any, any, any>) => {
    // creat a middleware for validate function
    const validationHandler: RequestHandler = async (req, res, next) => {
        const parseData = schema.parse(req.body)

        // set parse data to req.body
        req.body = parseData
        next()
    }
    // return validationHandler to use it as a middleware
    return validationHandler
}

export default validateRequestBody