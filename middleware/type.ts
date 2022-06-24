import { Request, Response , RequestHandler as Middleware } from 'express';
export type Product = {
  title: String,
  body: String,
  image: String,
  price: String,
  options: Array<any>
};

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

export type Handler = (req: Request, res: Response) => any;
export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};