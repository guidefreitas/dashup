import { Router, Response, Request, NextFunction } from "express";
import { IFeed } from "../models/feed";
import { FeedRepository } from "../models/repositories";
import { IFeedValue } from "../models/feedValue";
import { authMiddleware } from "./authMiddleware";

const apiFeedRouter: Router = Router();

apiFeedRouter
    .get("/", authMiddleware, (request: any, response: Response) => {
        let promise = Promise.resolve();
        promise.then(() => {
            return FeedRepository.find()
                  .where('user')
                  .equals(request.user._id)
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
    .get("/:id", authMiddleware, (request: any, response: Response) => {
        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.findById(request.params.id)
                                 .where('user')
                                 .equals(request.user._id)
                                 .populate('values')
                                 .exec();
        }).then((data) => {
            if(!data)
                throw 'Feed não encontrado';
            
            response.json({
                success: true,
                data: {
                    _id: data._id,
                    name: data.name,
                    values: data.values.sort((a,b) => {
                        return b.date - a.date;
                    })
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
    .delete("/:id", authMiddleware, (request: any, response: Response) => {
        
        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.findById(request.params.id)
                                 .where('user')
                                 .equals(request.user._id)
                                 .exec();
        }).then((data) => {
            if(!data)
                throw 'Feed não encontrado';
            
            return FeedRepository.remove(data);

        }).then((data) => {
            response.json({
                success: true
            });
        }).catch((error) => {
            response.statusCode = 500;
            response.json({
                success: false,
                message: error
            });
        });
    })
    .post("/", authMiddleware, (request: any, response: Response) => {
        let feed = <IFeed>{ 
            user: request.user._id,
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
    .get("/:id/values", authMiddleware, (request: any, response: Response) => {
        let promise = Promise.resolve();

        promise.then(() => {
            return FeedRepository.findById(request.params.id)
                      .where('user')
                      .equals(request.user._id)
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
    .post("/:id/values", authMiddleware, (request: any, response: Response) => {
        let query = FeedRepository.findById(request.params.id)
                      .where('user')
                      .equals(request.user._id)                     
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