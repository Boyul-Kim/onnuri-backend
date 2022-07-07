"use strict";

import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
const ENVIRONMENT = process.env.NODE_ENV.trim();

export const SERVER = Object.freeze({
    DB_URL: process.env["DB_URL"],
    DB_NAME: process.env["DB_NAME"],
    DB_OPTIONS: {
        user: process.env["DB_USER"],
        pass: process.env["DB_PASSWORD"],
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
})