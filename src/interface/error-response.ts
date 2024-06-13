export type TErrObj = {
    message: string;
    errorMessages: { path: string; message: string }[]
    stack: string
}