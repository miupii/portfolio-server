import ErrorCodes from "./error-codes.js";
import { Response } from "express";

const handleServerError = (error: any, res: Response) => {
    const {code, fn} = ErrorCodes.INTERNAL_ERROR;
    console.error(error);
    res.status(code).json(fn());
}

const handleBadRequest = (res: Response, customMessage?: string) => {
    const {code, fn} = ErrorCodes.BAD_REQUEST;
    res.status(code).json(fn(customMessage));
}

const handleNotFound = (res: Response, customMessage?: string) => {
    const {code, fn} = ErrorCodes.NOT_FOUND;
    res.status(code).json(fn(customMessage));
}

export default handleServerError;
export {
    handleBadRequest,
    handleNotFound
}