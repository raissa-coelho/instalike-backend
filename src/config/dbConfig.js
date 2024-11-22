import { MongoClient } from "mongodb";

export default async function connectDB(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao banco de dados...");
        await mongoClient.connect();
        console.log("Conexão estabelecida com sucesso!");
        return mongoClient;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados: ", error);
        process.exit();
    }
}