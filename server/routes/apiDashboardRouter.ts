import { Router, Response, Request, NextFunction } from "express";
import { DashboardRepository } from "../models/repositories";
import { IDashboard } from "../models/dashboard";
import { authMiddleware } from "./authMiddleware";

const apiDashboardRouter: Router = Router();

apiDashboardRouter.get("/", authMiddleware, (request: any, response: Response) => {
    let promise = Promise.resolve();

    promise.then(() => {
        return DashboardRepository.find()
                                  .where('user')
                                  .equals(request.user._id) 
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

apiDashboardRouter.get("/:id", authMiddleware, (request: any, response: Response) => {
    let promise = Promise.resolve();

    promise.then(() => {
        return DashboardRepository.findById(request.params.id)
                                  .where('user')
                                  .equals(request.user._id) 
                                  .select({_id: 1, name: 1, widgets: 1})
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

apiDashboardRouter.post("/", authMiddleware, (request: any, response: Response) => {
    let dashboard = <IDashboard>{
        user: request.user._id,
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