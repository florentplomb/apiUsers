import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';

// router.get('/', extractJWT, controller.getPosts);
// router.post('/', controller.createPosts);
// router.get('/all', controller.getAllPosts);

const createPosts = (req: Request, res: Response, next: NextFunction) => {
    let { type, age, subject, author, userId } = req.body;

    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        type,
        age,
        subject,
        author,
        userId
    });

    return post
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getPost = (req: Request, res: Response, next: NextFunction) => {
    Post.findOne({ _id: req.params.id })
        .exec()
        .then((post) => {
            return res.status(200).json({
                post
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    let filters = {};
    if (req.query.status) {
        filters = { status: req.query.status };
    }

    Post.find({ filters })
        .select('-messages')
        .exec()
        .then((results) => {
            return res.status(200).json({
                posts: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createPosts, getAllPosts, getPost };
