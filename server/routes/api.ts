import { Router, Response, Request, NextFunction } from "express";
import { authMiddleware } from "./authMiddleware";

const apiRouter: Router = Router();

apiRouter.get("/", authMiddleware, (request: any, response: Response) => {
    response.json({
        message: "Olá " + request.user.name
    });
});


export { apiRouter }