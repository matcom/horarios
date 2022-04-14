import { Response } from "express";
import { Either } from "../Either";
import { AppError } from "../errors/AppError";
import { Result } from "../Result";


export class ProcesResponse {

    public static setResponse<T>(res: Response, data: Either<AppError.UnexpectedErrorResult<T> | AppError.ValidationErrorResult<T>, Result<T>>) {
        if (!data.isLeft()) {
            const value = data.value.getValue().unwrap()
            return res.status(200).json(value)
        }


        const error = data.value.unwrapError()
        if (error.name == typeof AppError.UnexpectedError.name) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            })

        }

        if (error.name == AppError.ValidationError.name) {
            console.log('eee')
            return res.status(401).json({
                code: 401,
                message: error.message,
            })

        }
        return res.status(400)
    }
}