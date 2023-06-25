interface IFileManager{
    initDefaultSettings() : void
    initInputOperations(): void
    check(input:string): void
}

type TransformFiles = {
    name: string;
    type: string;
}[]

export {
    IFileManager,
    TransformFiles
}