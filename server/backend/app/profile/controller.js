import { getByName as getUserbyName } from "../users/model.js";

export async function serverProfilePage(req, res){
    const username = req.username;
    const user = await getUserbyName(username);
    res.render('../views/profile.ejs', {username,})//send(user)
}