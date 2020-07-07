exports.login = (req,res)=>{ 
    res.render('login')
}

exports.chat = (req,res)=>{

    const {number} = require('../index') 
    const {user_name} = req.body
    
    res.render('chat',{user_name,number})

}
