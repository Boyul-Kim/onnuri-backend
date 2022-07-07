import mongoose, { Schema, Model, Document } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import * as config from "../../config/environment";

const connection = mongoose.createConnection(config.SERVER.DB_URL+config.SERVER.DB_NAME);
autoIncrement.initialize(connection);

export interface IUser extends Document {
    userName: string;
    email: string;
}

const userSchema = new Schema({
    userName: {type: String, trim: true, required: true, lowercase: true},
    email: {type: String, trim: true, required: false, lowercase: true, default: ""},
})

userSchema.set("toObject", {
    virtuals: true
});

userSchema.index({
    "userName": 1,
    "email": 1,
})

userSchema.plugin(autoIncrement.plugin, { model: "User", field: "sno" });

export const users: Model<IUser> = mongoose.model<IUser>("user", userSchema)