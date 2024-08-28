import { HttpStatusCode } from 'axios';

export type ServerActionResponse = {
  status: HttpStatusCode;
  statusText?: string;
  body?: any;
};
