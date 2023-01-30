import { Request, ResponseToolkit } from '@hapi/hapi';
import User from '../models/User';
import mongoose from 'mongoose';

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const user = new User(request.payload);
    const userSaved = await user.save();
    return h.response(userSaved);
  } catch (err) {
    return h.response({ error: err }).code(500);
  }
};

export const getUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const users = await User.find();
    return h.response(users);
  } catch (err) {
    return h.response({ error: err }).code(500);
  }
};

export const getUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const userFound = await User.findById(request.params.id);
    if (!userFound) return h.response().code(404);

    return h.response(userFound);
  } catch (err) {
    return h.response({ error: err }).code(500);
  }
};

export const updateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    let updateData: any = {};
    if (typeof request.payload === 'object') {
      updateData = { ...request.payload };
    }

    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      updateData,
      { new: true }
    );
    if (!updatedUser) return h.response().code(404);

    return h.response(updatedUser);
  } catch (err) {
    return h.response({ error: err }).code(500);
  }
};

export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);
    if (!deletedUser) return h.response().code(404);

    return h.response(deletedUser);
  } catch (err) {
    return h.response({ error: err }).code(500);
  }
};
