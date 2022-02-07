import path from "path"
import fs from "fs"

interface IOptions<T> {
    configName: string
    dataPath: string
    defaults: T
}

export function readDb<T>(opts: IOptions<T>): T | undefined {
    if (!fs.existsSync(opts.dataPath)) fs.mkdirSync(opts.dataPath)
    let dbPath = path.join(opts.dataPath, opts.configName + ".json")

    return parseDataFile<T>(dbPath, opts.defaults)
}

export function setDb<T>(data: T, opts: IOptions<T>): boolean {
    if (!data) return false
    if (!fs.existsSync(opts.dataPath)) fs.mkdirSync(opts.dataPath)
    let dbPath = path.join(opts.dataPath, opts.configName + ".json")

    fs.writeFileSync(dbPath, JSON.stringify(data, undefined, 4))
    return true
}

export class Store<T> {
    path: string
    data: T
    constructor(opts: IOptions<T>) {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        const userDataPath = opts.dataPath
        const appDataPath = path.join(userDataPath, "Board")
        if (!fs.existsSync(appDataPath)) fs.mkdirSync(appDataPath)
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.path = path.join(appDataPath, opts.configName + ".json")

        this.data = parseDataFile<T>(this.path, opts.defaults)
    }

    // This will just return the property on the `data` object
    /*get(key: string) {
    return this.data[key];
  }*/
    get() {
        return this.data
    }

    set(data: any) {
        this.data = data
        // Wait, I thought using the node.js' synchronous APIs was bad form?
        // We're not writing a server so there's not nearly the same IO demand on the process
        // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
        // we might lose that data. Note that in a real app, we would try/catch this.
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }
}

function parseDataFile<T>(filePath: string, defaults: T) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
        return JSON.parse(fs.readFileSync(filePath).toString())
    } catch (error) {
        // if there was some kind of error, return the passed in defaults instead.
        fs.writeFileSync(filePath, JSON.stringify(defaults, undefined, 4))
        return defaults
    }
}
