/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-explicit-any: "error" */
export type TErrorObj = {
  status: number;
  message: string;
  errorMessages: { path: string; message: string }[];
  stack: string | undefined;
};

// define error handler type
export type TErrorHandler = (err: any) => TErrorObj;
