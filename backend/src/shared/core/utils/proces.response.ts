import { Response } from "express";
import { Either } from "../Either";
import { AppError } from "../errors/AppError";
import { Result } from "../Result";


export class ProcesResponse {

    public static setResponse<T>(res: Response, data: Either<AppError.UnexpectedErrorResult<T> | AppError.ValidationErrorResult<T>, Result<T>>): T {
        if (data.isRight) {
            return data.value.getValue().unwrap()
        }
        const error = data.value.errorValue()
        if (!error.isNone && typeof error == typeof AppError.UnexpectedError) {
            res.status(400).json({
                code: 400,
                message: error.unwrap().message,
            })
        }

        if (!error.isNone && typeof error == typeof AppError.ValidationError) {
            res.status(401).json({
                code: 401,
                message: error.unwrap().message,
            })
        }
    }
}