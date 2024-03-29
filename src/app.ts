import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import CrudRoute from "./routes";
import AppConfig from "./config";
import DBconfig from "./dbconfig";
class AppBootStrapper {
  app: any;
  constructor() {
    this.app = express();
    this.initialSetup();
    this.routeSetup();
    this.bootstrap();
    this.configureDatabase();
  }
  initialSetup = () => {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ title: "error" });
    });
  };
  routeSetup = () => {
    this.app.use("/", new CrudRoute().init());
  };
  bootstrap = () => {
    this.app.listen(AppConfig.portToConnect, function() {
      console.log("connected to port " + AppConfig.portToConnect);
    });
  };
  configureDatabase = () => {
    new DBconfig();
  };
}
new AppBootStrapper();
