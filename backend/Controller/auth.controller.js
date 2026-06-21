 import User from "../Model/user-model.js";
 import bcrypt from "bcrypt";
 import genToken from "../Config/token.js";
export const signUp = async (req,res) => {
    try{
       let {firstName,lastName,username,email,password} = req.body;
       let user = await User.findOne({email});
       if(user){
        return res.status(400).json({message:"user already exists"});
       }
       let user1 = await User.findOne({username});
       if(user1){
        return res.status(400).json({message:"username already exists"});
       }
       if(password.length < 6){
        return res.status(400).json({message:"password must be at least 6 characters"});
       }
       let hashPassword = await bcrypt.hash(password,10);
       let newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword
       });
       let token = await genToken(newUser._id);
       res.cookie("token",token,{
        httpOnly :true,
        maxAge : 7*24*60*60*1000,
        sameSite : "strict",
        secure : process.env.NODE_ENV === "development" ? false : true,


       })
      return res.status(201).json(newUser);
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error);

    }

}

export const login = async (req,res)=>{
    try{
      let {email,password} = req.body;
       let user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"user does not exist"});
       }
       let isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.status(400).json({message:"invalid credentials"});
       }
       let token = await genToken(user._id);
       res.cookie("token",token,{
        httpOnly :true,
        maxAge : 7*24*60*60*1000,
        sameSite : "strict",
        secure : process.env.NODE_ENV === "development" ? false : true,
       })
      return res.status(200).json({user});
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
export const logout = async (req,res) =>{
    try{
       res.clearCookie("token");
       return res.status(200).json({message: "logout successful"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"logout error"});

    }
}