import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../functions/signJWT';
import user from '../models/user';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized');

    return res.status(200).json({
        message: 'Authorized'
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username }, function (err, users) {
        if (users.length) {
            return res.status(409).json({
                message: 'Username already exist'
            });
        } else {
            // client pw hashing
            bcryptjs.hash(password, 10, (hashError, hash) => {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }

                const _user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hash
                });

                return _user
                    .save()
                    .then((user) => {
                        // user is a Mongoose document and not a regular object.
                        // You can convert it to one using toObject():
                        // To improve to just remove pw instead take each wanted prop
                        user.toObject();
                        var userTransfer = {
                            username: user.username,
                            _id: user._id
                        };

                        return res.status(201).json({ userTransfer });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            });
        }
    });
};
const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    // Check is user exist
    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            // Compare client pw with hashed pw stored
            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            logging.error(NAMESPACE, 'Unable to sign token', _error);
                            return res.status(401).json({
                                message: 'Unauthorized',
                                error: _error
                            });
                        } else if (token) {
                            console.log('Remove password here');
                            var user = users[0].toObject();
                            var userTransfer = {
                                username: user.username,
                                _id: user._id
                            };
                            return res.status(200).json({
                                message: 'Auth Successful',
                                token,
                                user: userTransfer
                            });
                        }
                    });
                }
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { validateToken, register, login, getAllUsers };
