import User from "../models/user.js";

export const findByUsername = (username) => User.findOne({ where: { username } });
export const createUser = (data) => User.create(data);
export const countUsers = () => User.count();
