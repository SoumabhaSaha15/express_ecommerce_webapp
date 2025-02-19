import express from "express";
export default ( _: express.Request, res: express.Response,) => res.render('error', { message: '404 page doesnot exist.' });