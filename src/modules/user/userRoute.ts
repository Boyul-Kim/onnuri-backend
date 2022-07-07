import express from "express";
import { userController, UserController } from "./userController";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

router.route("/info").get(async (req, res) => {
    console.log('testing router')
    // const response = await userController.createNewUser();
    res.status(200).send('response');
})

router.route("/create").post(async (req, res) => {
    console.log('user create test', req.body)
    const response = await userController.createNewUser(req.body)
    res.status(200).send("create success")
})

export { router as userRoute };