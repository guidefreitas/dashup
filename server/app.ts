import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import { loginRouter } from "./routes/login";
import { apiRouter } from "./routes/api";
import { apiFeedRouter } from "./routes/apiFeedRouter";
import { apiUserRouter } from "./routes/apiUserRouter";
import { apiDashboardRouter } from "./routes/apiDashboardRouter";
import { DbConnection } from "./DbConnection";

const app: express.Application = express();

DbConnection.connect();

app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/protected", apiRouter);
app.use("/login", loginRouter);
app.use("/api/user", apiUserRouter);
app.use("/api/feed", apiFeedRouter);
app.use("/api/dashboard", apiDashboardRouter);
app.use('/client', express.static(join(__dirname, '../client')));

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
