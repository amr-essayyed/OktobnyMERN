import { io } from '../app.js';
import cookie from 'cookie'; // Parses raw cookie string
import jwt from 'jsonwebtoken';
import env from 'dotenv'; env.config();

export const connectedUsers = new Set();

export function socketMW(socket,next){
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.accessToken;
    const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const username = payload.name;
    console.log('\n', username, " trying to connect: ", socket.id)
    if(![...connectedUsers].find(con=>con.name===username)){
        const connection = {name:username, socket: socket.id}; 
        connectedUsers.add(connection);
        console.log("\nconnected users: ", connectedUsers);
        next();
    }
}

export function onConnectionHndl(socket){
    
    // console.log(username);
    //process.connectedUsers ??= new Set();
    
    
    socket.on('disconnect', function disconnectedHndl(){
        let connection = [...connectedUsers].find(con=>con.socket===socket.id);
        connectedUsers.delete(connection);
        console.log(connectedUsers);
    });

}



function onMessageHndl(){
    console.log("user sent a message");
}