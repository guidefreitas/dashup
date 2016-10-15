import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import { UserRepository } from "../models/repositories";
import { IUser } from "../models/user";

const loginRouter: Router = Router();

loginRouter.post("/signup", function (request: Request, response: Response, next: NextFunction) {

    if (!request.body.hasOwnProperty("name")) {
        let err = new Error("No name");
        return next(err);
    }

    if (!request.body.hasOwnProperty("email")) {
        let err = new Error("No email");
        return next(err);
    }

    
    if (!request.body.hasOwnProperty("password")) {
        let err = new Error("No password");
        return next(err);
    }


    const salt = randomBytes(128).toString("base64");
    let promise = Promise.resolve();

    promise.then(() => {
        let hash = pbkdf2Sync(request.body.password, salt, 10000, length, digest);
        return hash;
    }).then((hash) => {
        let user = <IUser>{
            name: request.body.name,
            email: request.body.email,
            hashedPassword: hash.toString("hex"),
            salt: salt
        }
        return user;
    })
    .then((user) => {
        return UserRepository.create(user);
    }).then((data) => {
        response.json({
            name: data.name,
            email: data.email,
            hashedPassword: data.hashedPassword,
            salt: data.salt
        });
    }).catch((error) => {
        response.json({
            success: false,
            message: error
        });
    });
    
});

// login method
loginRouter.post("/", function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("email")) {
        let err = new Error("No email");
        err.status = 401;
        return next(err);
    }

    if (!request.body.hasOwnProperty("password")) {
        let err = new Error("No password");
        err.status = 401;
        return next(err);
    }

    let promise = Promise.resolve();
    promise.then(() => {
        return UserRepository.findOne()
                             .where('email')
                             .equals(request.body.email)
                             .exec();
    }).then((user) => {
        if(!user){
            let err = new Error("Invalid email");
            err.status = 401;
            return next(err);
        }   
        
        let hash = pbkdf2Sync(request.body.password, user.salt, 10000, length, digest);
        if (hash.toString("hex") === user.hashedPassword) {
            const token = sign({"user_id":user._id, "email": user.email, permissions: []}, secret, { expiresIn: "7d" });
            response.json(
                {
                    "jwt": token
                });

        } else {
            let err = new Error("Wrong password");
            err.status = 401;
            return next(err);
        }
        
    }).catch((error) => {
        console.log('Login error: ', error);
        
        response.json({
            success: false,
            message: error
        });
    })

    
});

export { loginRouter }
