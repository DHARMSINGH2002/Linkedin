import React, { useContext, useState } from "react";
import logo2 from "../assets/hero.png";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import dp from "../assets/download.jpg";
import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const context = useContext(UserDataContext) || {};
  const { userData = {} ,setUserData} = context;
  const [activeSearch, setSearch] = useState(false);
  const [showPopUp,setShowPopUp] = useState(false);
  let {serverUrl} = useContext(AuthDataContext);
  let navigate = useNavigate();
  const userName =
    userData?.firstName || userData?.firstname || userData?.name || "User";

    const handleSignOut = async ()=>{
      try {
         let result =await axios.get(serverUrl+"/api/auth/logout" ,{withCredentials:true})
         setUserData(null);
         navigate("/login");
          
         console.log(result);
        
      } catch (error) {
        
      }
    }

  return (
    <div className="w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-around items-center">
      <div className="flex justify-center items-center gap-[10px]">
        <div>
          <img src={logo2} alt="" className="w-[40px]" />
        </div>
        {!activeSearch && (
          <div>
            <FaSearch
              className="text-gray-600 h-[70%] lg:hidden  "
              onClick={() => setSearch(true)}
            />
          </div>
        )}

        <form
          className={`w-[300px] h-[40px] bg-[#eeece2] lg:flex items-center gap-[10px] p-[10px] rounded-md  ${!activeSearch ? "hidden" : ""}`}
        >
          <FaSearch className="text-gray-600 h-[70%]  " />

          <input type="text" placeholder="search users..." />
        </form>
      </div>
      <div className="flex justify-center items-center gap-[20px] text-gray-600 ">
        {showPopUp && <div className="w-[300px] min-h-[320px] bg-white shadow-lg absolute top-[74px] rounded-lg flex flex-col  items-center p-[20px] gap-[20px]">
             <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img src={userData.profileImage || dp} alt="" />
        </div>
        <div>
          {userName}
        </div>
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-md px-4 py-2.5 text-center leading-5">View Profile</button>
        <div className="w-full h-[1px] bg-gray-700"></div>
         <div className="  w-full flex justify-start text-gray-600 gap-[10px]">
          <FaUserFriends className="w-[23px] h-[23px]" />
          <div>My Network</div>
        </div>
                <button  onClick={handleSignOut} type="button" class="text-white bg-gradient-to-br from-red-600 to-gray-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-md px-4 py-2.5 text-center leading-5">Sign Out </button>

        </div> }
        <div className="lg:flex flex-col justify-center items-center text-gray-600 hidden">
          <IoMdHome className="w-[23px] h-[23px]" />

          <div>Home</div>
        </div>
        <div className="lg:flex flex-col justify-center items-center text-gray-600 hidden">
          <FaUserFriends className="w-[23px] h-[23px]" />

          <div>My Network</div>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-600 ">
          <IoIosNotifications className="w-[23px] h-[23px]" />

          <div className="hidden md:block">Notifications</div>
        </div>
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden" onClick={()=>setShowPopUp(prev =>!prev)}>
          <img src={userData.profileImage || dp } alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
