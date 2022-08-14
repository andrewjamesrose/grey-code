export function freezeObjectForDebug(inputObj: object): object {
    return  JSON.parse(JSON.stringify(inputObj))
}


export function printFrozenObject(inputObj: object): void {
    console.log(freezeObjectForDebug(inputObj))
}