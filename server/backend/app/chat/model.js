import Chat from "../../../DB/schemas/Chat.js";

export async function getByUser(loggedUser, contactUser){
    return await Chat.find({
        $or: [
            { sender: loggedUser, receiver: contactUser },
            { sender: contactUser, receiver: loggedUser }
        ]
    })
}

export async function add(loggedUser, contactUser, chatLineBody){
    const date = Date.now(); //! Date type and format
    // console.log(date)
    // console.log(post);
    try{    
        const chatLine = await Chat.create({sender:loggedUser, receiver: contactUser, message:chatLineBody});
        // console.log("chatLine: ", loggedUser, contactUser, chatLineBody);
        await chatLine.save();
        return chatLine;
    }
    catch(er)
    {
        console.log(er);
        return null;
    }
    // .then(()=>true)
    // .catch(e=>{console.error(e.message); return false;})
}