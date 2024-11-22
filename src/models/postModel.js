import 'dotenv/config';
import { ObjectId } from 'mongodb';
import connectDB from '../config/dbConfig.js';

const connect = await connectDB(process.env.STRING_CONEXAO);

export async function getPosts() {
    const db = connect.db("imersao-instabytes");
    const posts = db.collection("posts");
    return posts.find().toArray();
};

export async function createPost(newPost){
    const db = connect.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
} 

export async function updatePost(idPost, post_att){
    const db = connect.db("imersao-instabytes");
    const collection = db.collection("posts");
    const obj_Id = ObjectId.createFromHexString(idPost);
    return collection.updateOne({_id: new ObjectId(obj_Id)}, {$set: post_att});

}