import path from "path"
import fs from "fs"
import { InvalidArgumentError, JsonError, ReadFileError } from "@common/Errors"

interface IOptions<T> {
    configName: string
    dataPath: string
    defaults: T
}

/**
 * @throws {ReadFileError, JsonError}
 */
export function readDb<T>(opts: IOptions<T>): T {
    if (!fs.existsSync(opts.dataPath)) fs.mkdirSync(opts.dataPath)
    let dbPath = path.join(opts.dataPath, opts.configName + ".json")

    try {
        return parseDataFile<T>(dbPath, opts.defaults)
    } catch (e) {
        throw e
    }
}

/**
 * @throws {InvalidArgumentError, ReadFileError}
 */
export function setDb<T>(data: T, opts: IOptions<T>): true {
    if (!data)
        throw new InvalidArgumentError(
            "Tried to set db with undefined data argument"
        )
    if (!fs.existsSync(opts.dataPath)) fs.mkdirSync(opts.dataPath)
    let dbPath = path.join(opts.dataPath, opts.configName + ".json")

    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, undefined, 4))
    } catch (error) {
        throw new ReadFileError(undefined, error, dbPath)
    }
    return true
}

/**
 * @throws {ReadFileError, JsonError}
 */
function parseDataFile<T>(filePath: string, defaults: T): T {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaults, undefined, 4))
        return defaults
    }

    let c
    try {
        c = fs.readFileSync(filePath).toString()
    } catch (error) {
        throw new ReadFileError(undefined, error, filePath)
    }

    try {
        return JSON.parse(c)
    } catch (error) {
        throw new JsonError(undefined, error, c)
    }
}
