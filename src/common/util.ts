export function sum(a: number, b: number) {
    return a + b
}

export function uuidv4(): string {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        // tslint:disable-next-line:no-bitwise
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    )
}

export function getFileExtension(file: string): string | undefined {
    return file.split(".").pop() || undefined
}

/**
 * Converts month number into name.
 *
 * @param {*} month
 */
export function monthToName(month: number, short = true) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const monthNamesShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    return short ? monthNamesShort[month] : monthNames[month]
}

export function arrayInsert<T>(array: T[], index: number, item: T): T[] {
    array.splice(index, 0, item)
    return array
}

export function padLeadingZero(n: number): string {
    let s = n.toString()
    s = s.padStart(2, "0")
    return s
}
