import express from "express";
const router = express.Router();
router.get('/test', async (_: express.Request, res: express.Response) => {
  res.render('test/index');
});
export default router;