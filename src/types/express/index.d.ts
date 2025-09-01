// types/express/index.d.ts

import * as express from 'express';
import { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
        first_name?: string;
        last_name?: string;
        // add any other properties your JWT has
      };
    }
  }
}
declare module "express-serve-static-core" {
  interface Request {
    file?: File;
  }
}