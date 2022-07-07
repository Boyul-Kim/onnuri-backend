"use strict";
import {Database} from "./Database"

export class BootStrap {
    private dataBaseConnect = new Database();

    async bootStrap() {
        await this.dataBaseConnect.connectToDb();
    }
}