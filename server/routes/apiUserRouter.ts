import { Router, Response, Request, NextFunction } from "express";
import { IUser } from "../models/user";
import { UserRepository } from "../models/repositories";
import { authMiddleware } from "./authMiddleware";
import * as crypto from 'crypto';

const apiUserRouter: Router = Router();

apiUserRouter.get("/", authMiddleware, (request: Request, response: Response) => {
    let promise = Promise.resolve();

    promise.then(() => {
        return UserRepository.find()
                            .select({ _id:1, name: 1, email: 1, apiToken:1 })
                            .exec();
    }).then((data) => {
        let dataReturn = {
            success: true,
            count: data.length,
            data: data
        }
        response.json(dataReturn);
    }).catch((error) => {
        response.statusCode = 500;
        response.json({
            success: false,
            message: error
        });
    });
});

apiUserRouter.get("/profile", authMiddleware, (request: any, response: Response) => {
    let promise = Promise.resolve();

    promise.then(() => {
        return UserRepository.findById(request.user._id)
                            .select({ _id:1, name:1, email:1, apiToken:1 })
                            .exec();
    }).then((data) => {
        let dataReturn = {
            success: true,
            data: data
        }
        response.json(dataReturn);
    }).catch((error) => {
        response.statusCode = 500;
        response.json({
            success: false,
            message: error
        });
    });
});

apiUserRouter.post("/", authMiddleware, (request: Request, response: Response) => {
    let user = <IUser>{
        name: request.body.name,
        email: request.body.email,
        apiToken: crypto.randomBytes(16).toString("hex")
    };

    console.log(user);

    let promise = Promise.resolve();

    promise.then(() => {
        return UserRepository.create(user);
    }).then((data) => {
        response.json({
            success: true,
            data: user
        });
    }).catch((error) => {
        response.statusCode = 500;
        response.json({
            success: false,
            message: error
        });
    });
});

export { apiUserRouter }