import React, { useState, useContext, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext';


const defaultUserContext = {
    userData: null,
    setUserData: () => {},
    getCurrentUser: () => {},
};

export const UserDataContext = createContext(defaultUserContext);

function UserContext({ children }) {
    const [userData, setUserData] = useState(null);
    const { serverUrl } = useContext(AuthDataContext);
    const [edit, setEdit]= useState(false);
    const [postData, setPostData] =useState([]);
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true });
            console.log(result);
            setUserData(result.data);
        } catch (error) {
            console.log(error);
            setUserData(null);
        }
    };

    const getPost = async  ()=>{
        try {
            let result =  await axios.get(serverUrl+"/api/post/getpost",{withCredentials:true})
            setPostData(result.data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getCurrentUser()
        getPost()
    },[])

    const value = {
        userData,
        setUserData,
        getCurrentUser,
        edit,
        setEdit,
        postData,
        setPostData 
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext
