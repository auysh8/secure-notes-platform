import { Response, Request, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "Internal server error" });
};

export default errorHandler;
