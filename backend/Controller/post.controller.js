import Post from "../Model/post.model.js"
import uploadOnCloudinary from "../Config/Cloudinary.js"
const createPost = async (req,res) =>{
  try {
    let {description} = req.body
    let newPost;
    if(req.file){
        let image =  await uploadOnCloudinary(req.file.path)
       newPost =  await Post.create({
        author: req.userId,
            description,
            image
        })
    }
    else{
          newPost =  await Post.create({
            author: req.userId,
            description,
            
        })
    }
    return res.status(201).json(newPost)
  } catch (error) {
    
  }
}
export default createPost


export const getPost = async (req,res) =>{
  try {
     const post = await Post.find().populate("author","firstName lastName headline profileImage ");
     return res.status(200).json(post);
  } catch (error) {
      return res.status(500).json({messase :"get post error"});
  }
}