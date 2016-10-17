import * as express from "express";
import * as io from "socket.io";
import * as http from 'http';

export class WebSocketServer{
    static ioServer:any;

    public static Start(app : express.Application){
        let server = http.createServer(app);
        this.ioServer = io(server);
        server.listen(1337);
    } 

    static Send(feedId:string, message:any){
        console.log(feedId);
        this.ioServer.emit(feedId, message);
    }
}