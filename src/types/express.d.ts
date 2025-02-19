import { GridFSBucket } from "mongodb";
declare global {
  namespace Express {
    interface Request {
      GFSB: GridFSBucket;
    }
  }
}
