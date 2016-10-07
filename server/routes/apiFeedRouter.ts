import { Router, Response, Request, NextFunction } from "express";
import { IFeed } from "../models/feed";
import { FeedRepository } from "../models/repositories";
import { IFeedValue } from "../models/feedValue";
import { authMiddleware } from "./authMiddleware";

const apiFeedRouter: Router = Router();

apiFeedRouter
    .get("/", authMiddleware, (request: Request, response: Response) => {
        let promise = Promise.resolve();
        promise.then(() => {
            return FeedRepository.find()
                  .select({_id: 1, name: 1})
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
    })
    .get("/:id", authMiddleware, (request: Request, response: Response) => {
        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.findById(request.params.id)
                                 .exec();
        }).then((data) => {
            if(!data)
                throw 'Feed não encontrado';
            
            response.json({
                success: true,
                data: {
                    _id: data._id,
                    name: data.name
                }
            });

        }).catch((error) => {
            response.statusCode = 500;
            response.json({
                success: false,
                message: error
            });
        });                          
    })
    .post("/", authMiddleware, (request: Request, response: Response) => {
        let feed = <IFeed>{ 
            user: request.body.user_id,
            name: request.body.name
        }

        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.create(feed);
        }).then((data) => {
            response.json({
                success: true,
                feed: {
                    _id: data._id,
                    name: data.name
                }
            });
        }).catch((error) => {
            response.statusCode = 500;
            response.json({
                success: false,
                message: error
            });
        })
    })
    .get("/:id/values", authMiddleware, (request: Request, response: Response) => {
        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.findById(request.params.id)
                      .populate('values')
                      .exec();
        }).then((data:IFeed) => {
            if(!data)
                throw 'Feed não encontrado';

            response.json({
                success: true,
                data: data.values
            });
        }).catch((error) => {
            response.statusCode = 500;
            response.json({
                success: false,
                message: error
            });
        })
    })
    .post("/:id/values", authMiddleware, (request: Request, response: Response) => {
        let query = FeedRepository.findById(request.params.id)
                      .exec();
        let feedValue = <IFeedValue>{
            value: request.body.value
        }

        query.then((data) => {
            data.values.push(feedValue);
            return FeedRepository.update(data);
        }).then((data) => {
            response.json({
                success: true,
                data: feedValue
            });
        }).catch((error) => {
            response.statusCode = 500;
            response.json({
                success: false,
                message: error
            });
        });
    });

export { apiFeedRouter }