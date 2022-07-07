"use strict";
import { BaseDao } from "../baseDao";
import { Types } from "mongoose";

export class UserDao extends BaseDao {
    /**
* @function createNewUser
* @description create a new user
* @param params
 */
async createNewUser(params) {
    try {
        const payload = {
            userName: params.userName,
            email: params.email
        }
        return await this.save("users", payload)
    }catch(error) {
        throw error;
    }
}

}

export const userDao = new UserDao();