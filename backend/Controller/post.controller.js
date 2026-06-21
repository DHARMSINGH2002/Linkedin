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
     const post = (await Post.find().populate("author","firstName lastName headline profileImage ")).sort({createdAt :-1});
     return res.status(200).json(post);
  } catch (error) {
      return res.status(500).json({messase :"get post error"});
  }
}

export const like = async (req, res) =>{
  try {
      let postId = req.params.id
      let userId = req.userId
      let post  =  await Post.findById(postId);
      if(!post){
        return res.status(400).json({message:"post not found"})
      }
      if(post.like.includes(userId)){
        post.like.filter((id)=> id!=userId)
      }
      else{
        post.like.push(userId);
      }
     await  post.save();
     return res.status(200).json(post);
      
    } catch (error) {
     return  res.status(400).json({message:"like eerro"})
  }
}

export const comment = (req, res)=>{
  try {
    let postId =req.params.id;
    let userid =req.userId
    let {content}= req.body
    let post  = Post.findByIdAndUpdate(postid,{
      $push:{comment:{content,user:userId}}
    },{new:true}).populate("comment.user", "firstName lastName profileImage headline ")
   return res.status(200).json(post);
  } catch (error) {
    
  }
}