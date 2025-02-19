import express from "express";
import { ZodError } from "zod";
import { MongoServerError } from 'mongodb';
export default (err: Error, _: express.Request, res: express.Response, __: express.NextFunction) => {
  if (err instanceof ZodError) {
    const errorMessage = err.errors.map((issue) => (issue.message)).join(' & ');
    res.render('signup/error', { message: errorMessage });
  } else if (err instanceof MongoServerError) {
    const { keyValue } = err.errorResponse;
    let errorMessage = '';
    for (const key in keyValue) errorMessage += `${key} : ${keyValue[key]} is already in use.`;
    res.render('signup/error', { message: errorMessage });
  }
  else res.render('signup/error', { message: err.message });
}