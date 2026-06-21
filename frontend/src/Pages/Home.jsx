import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import dp from "../assets/download.jpg";
import { FaPlus } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import { FaRegImage } from "react-icons/fa";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import EditProfile from "../components/EditProfile";
import { RxCross2 } from "react-icons/rx";
import { AuthDataContext } from "../context/AuthContext";
import Post from "../components/Post"
function Home() {
  let {serverUrl} = useContext(AuthDataContext);
  const context = useContext(UserDataContext) || {};
  let [frontEndImage,setFrontEndImage] = useState("");
  let [backEndImage,setBackEndImage] = useState("");
  let [description,setDescription] = useState("");
  let image = useRef();
  let [posting , setPosting] = useState(false);
  let[uploadPost, setUploadPost] = useState(false);
  function handleImage(e){
    let file = e.target.files[0]
    setBackEndImage(file)
      setFrontEndImage(URL.createObjectURL(file))
    
  }

  async function handleUploadPost(){
    setPosting(true);
    try {
      let formdata = new FormData();
      formdata.append("description", description);
      if(backEndImage){
        formdata.append("image",backEndImage);
      }
      let result  =  await axios.post(serverUrl+"/api/post/create" ,formdata,{withCredentials:true}) 
      setPosting(false)
      setUploadPost(false);
    } catch (error) {
       setPosting(false);
      //  setUploadPost(false);
    }
  }
  let { userData = {}, edit, setEdit, postData, setPostData } = context;
  const userName =
    userData?.firstName || userData?.firstname || userData?.name || "User";

  return (
    <div className="w-screen min-h-[100vh] bg-[#f0efe7] pt-[80px] flex items-start px-[20px] justify-center gap-[20px] flex-col relative lg:flex-row">
      {edit && <EditProfile />}

      <Navbar />
      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg">
        <div className="w-full h-[100px] bg-gray-500 flex justify-center items-center rounded-lg overflow-hidden">
          <img src={userData.profileImage || dp} alt="Profile cover" className="w-full h-full object-cover" onClick={() => setEdit(true)} />
        </div>
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative top-[-20px] left-[30px]">
          <img src={userData.coverImage || dp } alt="Profile" className="w-full h-full object-cover" onClick={() => setEdit(true)} />
        </div>
        <div className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[170px] left-[260px] rounded-full flex justify-center items-center cursor-pointer">
          <FaPlus className="text-white" />
        </div>
        <div className="left-[20px]">{userName}</div>
        <div>{userData.location}</div>
        <button
          type="button"
          className="flex justify-center items-center gap-[10px] w-full h-[40px] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-sm px-4 py-2.5 text-center leading-5"
          onClick={() => setEdit(true)}
        >
          View Profile <SlPencil />
        </button>
      </div>
       {uploadPost  &&        <div className=" fixed w-full h-full bg-black  top-0 z-[100]  opacity-[0.57]"></div>
}
       {uploadPost &&  <div className=" fixed w-[90%]  max-w-[500px] h-[600px] bg-white  shadow-lg  rounded-lg  flex  flex-col justify-start gap-20px z-[200]">
        <div className="absolute right-[20px] top-[10px]">
                  <RxCross2
                    className="text-gray-500 w-[50px] h-[30px] font-bold cursor-pointer"
                    onClick={()=>setUploadPost(false)}
                  />
                </div> 
                 <div className=" w-full flex  justify-center gap-10 py-[10px]">
                 <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative top-[5px] left-[30px]">
          <img src={userData.coverImage || dp } alt="Profile" className="w-full h-full object-cover" onClick={() => setEdit(true)} />
        </div>
        <div className=" py-[20px] ">{userName}</div>
        </div>

        <textarea  value={description} onChange={(e)=>setDescription(e.target.value)} className ={`w-full ${frontEndImage} ? "h-[200px] :"h-[400px]"} outline-none overflow-auto border-none text-[19px]  p-[20px] resize-none`} placeholder="what do you want to talk about ?"></textarea>
         <input type="file" onChange={handleImage} ref={image} hidden/>
          <div>
            <img src={frontEndImage || ""} alt="" />
          </div>
        <div className="w-full  flex flex-col h-[200px]">
          <div className="p-[30px]  flex items-center justify-start border-b-2 border-gray-500 "> <FaRegImage onClick={()=>image.current.click()} className="w-[24px] h-[24px] text-gray-600" /></div>
         
          <div className="flex justify-end items-center m-[20px]">
            <button className="w-[100px] h-[50px]  rounded-full bg-[#24b2ff] mt-[40px] text-white" disabled={posting} onClick={handleUploadPost}>{posting? "posting..." : "Post"}</button>
          </div>
        </div>
       </div>}
       

      <div className="w-full lg:w-[50%] min-h-[200px] bg-[white] flex flex-col gap-5 ">
        <div className="w-full h-[120px] bg-white shadow-lg rounded-lg  flex justify-center items-center gap-7">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative top-[5px] left-[30px]">
          <img src={userData.coverImage || dp } alt="Profile" className="w-full h-full object-cover" onClick={() => setEdit(true)} />
        </div>
         <button className="  rounded-full w-[80%] h-[60%] border-2 border-gray-700 flex justify-start items-center px-[20px] hover:bg-gray-300" onClick={()=>setUploadPost(true)}>Start a  Post </button>

        </div>
         {postData.map((post,index)=>(
              <Post key={index} id ={post._id} description={post.description} author={post.author} image ={post.image} like ={post.like} comment={post.comment} createdAt={post.createdAt} />
         )

         )}
         
      </div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg"></div>
    </div>
  );
}

export default Home;
