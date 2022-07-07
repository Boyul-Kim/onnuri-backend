"use strict";

import { userDao, UserDao } from "./userDao";
export class UserController {
    /**
   * @function createNewUser
   * @description creates new User
   */
  async createNewUser(params) {
      try {
        console.log('testing create new user: ', params)
        const response = await userDao.createNewUser(params)
        console.log('create new user resopnse', response)
        return 'success'
      }catch(error) {
          throw error;
      }
  }
}

export const userController = new UserController();