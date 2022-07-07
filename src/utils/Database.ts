"use strict";

import mongoose from "mongoose";
import * as config from "../config/environment";

export class Database {
    async connectToDb() {
        const connection = new Promise<void>((resolve, reject) => {
            try {
                const dataBaseName = config.SERVER.DB_NAME;
                let databaseURL = config.SERVER.DB_URL;

                mongoose.connect(databaseURL+dataBaseName);

                mongoose.connection.once("open", function() {
                    console.log("MongoDB database connection established successfully");
                })

                mongoose.connection.on("connected", function() {
                    console.log("=================================================")
                    console.log(`Connected to ${databaseURL + dataBaseName}`);
                    console.log("=================================================")
                    resolve();
                });

                mongoose.connection.on("error", error => {
                    console.log("DB connection error", error);
                    reject(error);
                });

                mongoose.connection.on("disconnected", () => {
                    console.log('DB connection diconnected');
                    reject("DB connection disconnected");
                })
            }catch(error) {
                throw(error);
            }
        });
        return connection
    }
}