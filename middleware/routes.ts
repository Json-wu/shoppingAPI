import { importPro } from '../routes/product';
import { Route } from './type';

export const routes: Route[] = [
  {
    method: 'post',
    path: '/product',
    middleware: [],
    handler: importPro,
  }
];