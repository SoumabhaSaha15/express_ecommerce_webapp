import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express"
import typeError from "./GET/typeError.js";
import invalidSeller from "./GET/invalidSeller.js";
import renderPage from "./GET/renderPage.js";
const router = express.Router();
// import express from "express";
// export default 

router
  .route('/client/:id/view-products')
  .all(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const param = req.params['id'];
      const cookie = req.cookies['id'];
      if (param == null || cookie == null) throw new Error('Invalid cookies or param!!!');
      const decoded = jwt.verify(cookie, process.env.JWT_KEY) as JwtPayload;
      if (decoded.id && decoded.id === param) next();
      else throw new Error('Invalid cookies!!!');
    } catch (e) {
      next(e);
    }
  })
  .get(
    invalidSeller,
    typeError,
    renderPage
  )
  .post(
    invalidSeller, 
    typeError, 
    renderPage
  );
export default router;