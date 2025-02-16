import express from "express"
import type { Express } from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const app: Express = express();

const PORT = 8080;

app.use(express.json());
app.use(cors())

const prisma = new PrismaClient();

app.get("/appTodos", (req: express.Request, res: express.Response) => {
    const allTodos =  prisma.todo.findMany().then(function(data){
        console.log(data);
        return res.json(data);
    })
});

app.post("/createTodo", async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const { title, isCompleted} = req.body;

    
    try {
        const allTodos = await prisma.todo.create({
            data: {
                title,
                isCompleted
            }
        });
    
        console.log(allTodos);
        return res.json(allTodos);
    } catch (error) {
        res.status(400).json(error)
    }
    
});

app.put("/editTodo/:id", async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const id = Number(req.params.id);
    const { title, isCompleted} = req.body;
    const editTodo = await prisma.todo.update({
        where: { id },
        data: {
            title,
            isCompleted
        }
    });
    
    console.log(editTodo);
    return res.json(editTodo);
    
});

app.delete("/deleteTodo/:id", async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    try{
        const deleteTodo = await prisma.todo.delete({
            where: { id }
        });
        console.log(deleteTodo);
        return res.json(deleteTodo);
    }  catch(e){
        return res.status(500).json(e)
    }
    
    
    
});

app.listen(PORT, () => console.log("server is runnning"));