import { Response } from "express";

interface Tmeta {
    page: number;
    limit: number;
    total: number;
  };

interface TResponseData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Tmeta
}


export const sentResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statuscode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};