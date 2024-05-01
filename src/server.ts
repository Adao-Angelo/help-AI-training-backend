import Express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routers/index_router";
import { AppError } from "./errors/appErros";

const app = Express();

app.use(Express.json());
app.use(router);

//error_handling_config
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server Error - ${err.message}`,
    });
  }
);

app.listen(9000, () => console.log("Server listening"));
