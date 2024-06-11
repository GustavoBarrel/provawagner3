import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

// Restante do código permanece o mesmo


// Middleware para lidar com dados JSON
app.use(express.json());

app.use(cors({
    origin: '*'
}));


app.get('/allProducts', async (req, res) => {
    try {
        const AllPost = await prisma.post.findMany();
        res.json(AllPost);
    } catch (error) {
        res.status(500).send('Erro ao recuperar usuários do banco de dados');
    }
});

app.get('/AllProduct/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.post.findUnique({
            where: { id }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao recuperar usuário do banco de dados');
    }
});

// app.get('/user', async (req, res) => {
//     try {
//         const allUsers = await prisma.user.findMany();
//         res.json(allUsers);
//     } catch (error) {
//         res.status(500).send('Erro ao recuperar usuários do banco de dados');
//     }
// });


// Rota para criar um novo produto
app.post('/productCreate', async (req, res) => {

    const { titulo, descricao, preco } = req.body;

    try {
        const newProduct = await prisma.post.create({
            data: {
                titulo,
                descricao,
                preco,
                usuario: { connect: { id: 1 } } // Conecta o produto ao usuário pelo ID
            }
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar produto');
    }
});


// Rota para atualizar um produto existente
app.put('/productUpdate/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, preco, usuario } = req.body;
    try {
        const updatedProduct = await prisma.post.update({
            where: { id },
            data: {
                titulo,
                descricao,
                preco: parseFloat(preco),
                userId: parseInt(usuario)
            }
        });
        res.status(201).json("produto atualizad ocom sucesso", updatedProduct);
    } catch (error) {
        res.status(500).send('Erro ao atualizar produto do banco de dados');
    }
});

// Rota para excluir um usuário existente
app.delete('/productDel/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedProduct = await prisma.post.delete({
            where: { id }
        });
        if (deletedProduct) {
            res.send('Produto excluído com sucesso');
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao excluir produto do banco de dados');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});
