import { getByUser, add } from './model.js'
import { isLoggedIn } from '../utility/auth.js';
import { io } from '../app.js';
import { connectedUsers } from './socket.js';

export async function getChat(req, res){
    const chatingUsername = req.params.user;

    const loginData = isLoggedIn(req);

    try{

        const chatMessages = await getByUser(loginData.name, chatingUsername);
        // console.log("chat: ", chatMessages);
        res.status(200).render('../views/chat', {you: loginData.name,him: chatingUsername, chatMessages})
    }
    catch{
        res.status(400).send({msg:" something went wrong"}); //! thee should be a page fot that

    }
}

export async function postChatLine(req, res){
    const chatingUsername = req.params.user;

    const loginData = isLoggedIn(req);

    try{
        const chatLineD = await add(loginData.name, chatingUsername, req.body.chatLine);
        console.log("added line")//, chatLineD);
        //! if receiver has web socket open emit chatLine for him
        const conUser = [...connectedUsers].find(con=>con.name===chatingUsername);
        if(conUser){
            console.log("emiting chatLine to user: ", conUser.name, "on: ", conUser.socket);
            
            io.to(conUser.socket).emit('chatLineSent', chatLineD);
            // io.emit('chatLineSent', chatLineD);
        } 
        res.status(201).send({msg: "added successfully"})//render('../views/chat', {you: loginData.name,him: chatingUsername, chatMessages})
    }
    catch(e){
        res.status(400).send({msg:" something went wrong"}); //! there should be a page for that
        console.error(e);
    }
}