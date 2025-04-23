import jwt from 'jsonwebtoken';
import { isLoggedIn } from '../utility/auth.js';

export function serverMainPAge(req,res){
    const loginData = isLoggedIn(req);
    if(loginData !== null){
        req.username = loginData.name;
        res.render('../views/index.ejs', {isLoggedIn:true}); 
    }else{
        res.render('../views/index.ejs', {isLoggedIn:false}); 
    }
    
    // try{
    //     const token = req.cookies.accessToken;
    //     const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    //     req.username = payload.name;
    //     res.render('../views/index.ejs', {isLoggedIn:true}); 
    // }
    // catch(e){
    //     console.error(e.message);
    //     res.render('../views/index.ejs', {isLoggedIn:false}); 
    // }
}