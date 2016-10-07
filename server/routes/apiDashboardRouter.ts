import { Router, Response, Request, NextFunction } from "express";
import { DashboardRepository } from "../models/repositories";
import { IDashboard } from "../models/dashboard";
import { authMiddleware } from "./authMiddleware";

const apiDashboardRouter: Router = Router();

apiDashboardRouter.get("/", authMiddleware, (request: Request, response: Response) => {
    let promise = Promise.resolve();

    promise.then(() => {
        return DashboardRepository.find()
                                  .select({_id: 1, name: 1})
                                  .exec();
    }).then((data) => {
        let dataResponse = {
            success: true,
            count: data.length,
            data: data
        }

        response.json({
            success: true,
            count: data.length,
            data: data
        });
    }).catch((error) => {
        response.statusCode = 500;
        response.json({
            success: false,
            message: error
        });
    });
});

apiDashboardRouter.post("/", authMiddleware, (request: Request, response: Response) => {
    let dashboard = <IDashboard>{
        name: request.body.name
    };

    let promise = Promise.resolve();
    promise.then(() => {
        return DashboardRepository.create(dashboard);
    }).then((data) => {
        response.json({
            success: true,
            data: data
        });
    }).catch((error) => {
        response.statusCode = 500;
        response.json({
            success: false,
            message: error
        });
    })
});

export { apiDashboardRouter }