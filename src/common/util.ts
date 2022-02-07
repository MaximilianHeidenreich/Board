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
