import { Router, Response, Request, NextFunction } from "express";
import {FeedRepository, UserRepository } from "../models/repositories";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

let authMiddleware = (request: any & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    let promise = Promise.resolve();
    promise.then(() => {
        return verify(token, secret);
    }).then((decoded) => {
        return UserRepository.findById(decoded.user_id).exec(); 
    }).then((user) => {
        request.user = user;
        next();
    }).catch((tokenError) => {
        return response.status(403).json({
            message: "Invalid token, please Log in first"
        });
    })
}

export { authMiddleware };