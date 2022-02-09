const REASON_MSG_MAP: { [key: string]: (...args: any[]) => string } = {
    UncaughtError: () => "Uncaught error",
    CancelledError: () => "Cancelled",
    InvalidArgumentError: () => "Invalid argument",
    NotFoundError: () => "Not found",
    JsonError: () => "JSON error",

    ReadFileError: (file: string) => {
        return `Could not read from file ${file ? file : ""}`
    },
    WriteFileError: (file: string) => {
        return `Could not write to file ${file ? file : ""}`
    },
}

/**
 * Unified class for "Serialized errors".
 *
 * Common reasons:
 *
 *      UncaughtError            - meta: { error }
 *      CancelledError           - Generic "something was cancelled".
 *      InvalidArgumentError     - Generic "a value was undefined in x".
 *      NotFoundError            - Generic "value could not be found in x".
 *      JsonError                - Could not parse json string. meta: { error, json: string }
 *
 *      ReadFileError            - Could not read file. meta: { error, file: string }
 *      WriteFileError           - Could not write file. meta: { error, file: string }
 *
 */
export class Rejection {
    reason: string
    stackTrace: string | undefined
    msg?: string
    meta?: any

    constructor(reason: string, msg?: string, meta?: any) {
        this.reason = reason
        this.stackTrace = new Error().stack
        this.msg = msg || REASON_MSG_MAP[reason]()
        this.meta = meta
    }
    toString() {
        return `Rejection(${this.reason}, '${this.msg}') at:\n${this.stackTrace}`
    }
    toError(): AppError {
        switch (this.reason) {
            case "UncaughtError":
                return new UncaughtError(this.meta?.error, this.msg)
            case "CancelledError":
                return new CancelledError(this.msg)
            case "InvalidArgumentError":
                return new InvalidArgumentError(this.msg)
            case "NotFoundError":
                return new NotFoundError(this.msg)
            case "JsonError":
                return new JsonError(
                    this.msg,
                    this.meta?.error,
                    this.meta?.json
                )
            case "ReadFileError":
                return new ReadFileError(
                    this.meta?.error,
                    this.meta?.error,
                    this.meta?.file
                )
            case "WriteFileError":
                return new WriteFileError(
                    this.meta?.error,
                    this.meta?.error,
                    this.meta?.file
                )
            default:
                return new AppError(this.msg)
        }
    }
}
export const UnhandledRejection = () => {
    return new Rejection(
        "UnhandledRejection",
        `Unhandled Rejection at \n ${new Error().stack}`
    )
}
/**
 * Helper to quickly check if a value is a promise rejection
 * @param t
 * @returns
 */
export const isError = (t: any) => t instanceof Rejection
export const toRejection = (t: any) => t as Rejection

/**
 * Base application error all other errors extend from.
 */
export class AppError extends Error {
    constructor(msg?: string) {
        super(msg)
    }
    toRejection(meta?: any) {
        return new Rejection(this.constructor.name, this.message, meta)
    }
}
export class UncaughtError extends AppError {
    error
    constructor(error: any, msg?: string) {
        super(msg)
        this.error = error
    }
    toRejection() {
        return super.toRejection({ error: this.error })
    }
}
export class CancelledError extends AppError {
    constructor(msg?: string) {
        super(msg)
    }
}

export class InvalidArgumentError extends AppError {}
export class NotFoundError extends AppError {}
export class JsonError extends AppError {
    error
    json
    constructor(msg?: string, error?: any, json?: string) {
        super(msg)
        this.error = error
        this.json = json
    }
    toRejection() {
        return super.toRejection({ error: this.error, json: this.json })
    }
}
export class ReadFileError extends AppError {
    error
    file
    constructor(msg?: string, error?: any, file?: string) {
        super(msg || REASON_MSG_MAP["ReadFileError"](file))
        this.error = error
        this.file = file
    }
    topRejection() {
        return super.toRejection({ error: this.error, file: this.file })
    }
}
export class WriteFileError extends AppError {
    error
    file
    constructor(msg?: string, error?: any, file?: string) {
        super(msg || REASON_MSG_MAP["WriteFileError"](file))
        this.error = error
        this.file = file
    }
    topRejection() {
        return super.toRejection({ error: this.error, file: this.file })
    }
}
