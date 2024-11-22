import fs from 'fs';
import {getPosts, createPost, updatePost} from '../models/postModel.js';
import { gerarDescricaoComGemini } from '../services/geminiService.js'; 

export async function listPost (req, res) {
    const result = await getPosts();
    res.status(200).json(result);
}

export async function criaPost (req, res) {
    const newPost = req.body;
    try {
        const cPost = await createPost(newPost);
        res.status(201).json(cPost); 
    }catch(error) {
        console.error(error.message);
        res.status(500).send({'Erro': "Erro ao criar post"});
    }
}

export async function upImg (req, res) {
    const newImg = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const cPost = await createPost(newImg);
        const imgAtualizada = `uploads/${cPost.insertedId}.png`;
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(201).json(cPost); 
    }catch(error) {
        console.error(error.message);
        res.status(500).send({'Erro': "Erro ao criar post"});
    }
}

export async function atualizaPost (req, res) {
    const idPost = req.params.id;
    const urlImg = `http://localhost:3000/${idPost}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${idPost}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post_att = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        };

        const cPost = await updatePost(idPost, post_att);
        res.status(201).json(cPost); 
    }catch(error) {
        console.error(error.message);
        res.status(500).send({'Erro': "Erro ao criar post"});
    }
}