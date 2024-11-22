import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { listPost, criaPost , upImg, atualizaPost} from '../controller/postController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: './uploads' , storage});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listPost);
    app.post("/posts", criaPost);
    app.post("/upload", upload.single('img'), upImg);
    app.put("/upload/:id", atualizaPost);
};

export default routes;