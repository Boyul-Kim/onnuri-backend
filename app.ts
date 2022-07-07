import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import { Server } from 'http';
import path from 'path';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"
import {userRoute} from './src/modules/user/userRoute'
require('dotenv').config();


export default class Application {
  public app: express.Application;
  public jsonMiddleware: any;

  //Initialize Server and apply Middleware
  public init = async (): Promise<void> => {
    this.app = express();
    this.jsonMiddleware = express.json();

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(this.jsonMiddleware)

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    try {
      const port = process.env.PORT;

      this.app.get("/", (req, res) => {
        if(req.user) res.send(req.user);
        else res.send('Hello World!');
      });

      this.app.get("/auth/twitch", passport.authenticate("twitch"));

      this.app.get("/auth/twitch/redirect", 
        passport.authenticate("twitch", { failureRedirect: "/" }), 
        (req, res) => {
          res.redirect('/');
      });

      this.app.use("/user", userRoute)

      this.app.listen(port, () => {
        console.log('=================================================')
        console.log(` server started on ${port}`);
        console.log('=================================================');
      });
    } catch (error) {
      console.log('Could not initialize server', error);
      throw Error(error);
    }
  };
}