import express from 'express';
//import cors from 'cors';
var cors = require('cors');
import jwt from 'jwt-simple';
import users from './fakedatabse';
import {initialize, authenticate} from './auth';
import { jwtSecret } from './config';

const server = express();
server.use(cors());
server.use(express.json());
server.use(initialize());

server.post("/token", (req, res) => {
    const {email, senha} = req.body;
    console.log(email, senha);
    if (!email || !senha) {
        return res.sendStatus(401);
    }
    var user = users.find(u => u.email === email && senha === senha);
    if (user) {
        var payload = {user: user};
        var token = jwt.encode(payload, jwtSecret);
        res.json({token: token});
    }
    else {
        res.sendStatus(401);
    }
});

server.get("/", authenticate(), (req, res)=> {
    const user = req.user as {id: number}
    //const target = users.find(u => u.id = user.id);
    //if (target)
        return res.json(user);
    //return res.sendStatus(401);
});

console.log("SERVIDOR RODANDO");
server.listen(3333);