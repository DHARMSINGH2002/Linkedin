import React, { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { UserDataContext } from "../context/UserContext";
import dp from "../assets/download.jpg";
import { FaPlus } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
function EditProfile() {
  const { setEdit, userData } = useContext(UserDataContext);
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [userName, setUserName] = useState(userData?.username || "");
  const [headline, setHeadLine] = useState(userData?.headline || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [location, setLocation] = useState(userData?.location || "");
  const profileImage = useRef();
  const coverImage = useRef();
  const [frontProfileImage,setFrontProfileImage]= useState(userData.profileImage || dp);
  const [backProfileImage,setBackProfileImage]= useState(null);
  const [frontCoverImage,setFrontCoverImage]= useState(userData.coverImage || dp);
  const [backCoverImage,setbackCoverImage]= useState(null);
  let {serverUrl} = useContext(AuthDataContext);
  const [saving , setSaving] = useState(false);
   
  const [skills, setSkills] = useState(() => {
    const rawSkills = userData?.skills;
    if (Array.isArray(rawSkills)) return rawSkills;
    if (typeof rawSkills === "string") {
      return rawSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
    return [];
  });
  const [newSkill, setNewSkill] = useState("");

  const [education, setEducation] = useState(
    Array.isArray(userData?.education) ? userData.education : []
  );
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    field: "",
  });
   const [experience, setExperience] = useState(
    Array.isArray(userData?.experience) ? userData.experience : []
  );
  const [newExperience, setNewExperience] = useState({
  title :"",
            company : "",
            description :"",
  });

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();

    if (!trimmedSkill) {
      setNewSkill("");
      return;
    }

    setSkills((prevSkills) => {
      const currentSkills = Array.isArray(prevSkills) ? prevSkills : [];
      return currentSkills.includes(trimmedSkill)
        ? currentSkills
        : [...currentSkills, trimmedSkill];
    });
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prevSkills) =>
      Array.isArray(prevSkills)
        ? prevSkills.filter((skill) => skill !== skillToRemove)
        : []
    );
  };

  const removeEducation = (educationToRemove) => {
    setEducation((educations) =>
      Array.isArray(educations)
        ? educations.filter((edu) => edu !== educationToRemove)
        : []
    );
  };
const removeExperience = (experienceToRemove) => {
    setEducation((exps) =>
      Array.isArray(exps)
        ? exps.filter((edu) => edu !== experienceToRemove)
        : []
    );
  };

  function handleProfileImage(e){
          let file =e.target.files[0];
          setBackProfileImage(file);
          setFrontProfileImage(URL.createObjectURL(file));
  }
  function handleCoverImage(e){
          let file =e.target.files[0];
          setbackCoverImage(file);
          setFrontCoverImage(URL.createObjectURL(file));
  }

  const addEducation = () => {
    const { college, degree, field } = newEducation;
    const trimmedCollege = college.trim();
    const trimmedDegree = degree.trim();
    const trimmedField = field.trim();

    if (!trimmedCollege || !trimmedDegree || !trimmedField) return;

    setEducation((prevEducation) => [
      ...prevEducation,
      {
        college: trimmedCollege,
        degree: trimmedDegree,
        field: trimmedField,
      },
    ]);

    setNewEducation({ college: "", degree: "", field: "" });
  };

   const addExperience = () => {
    const { company, title, description } = newExperience;
    const trimmedCompany = company.trim();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedCompany || !trimmedTitle || !trimmedDescription) return;

    setExperience((prevExp) => [
      ...prevExp,
      {
        company: trimmedCompany,
        title: trimmedTitle,
        description: trimmedDescription,
      },
    ]);

    setNewExperience({ company: "", title: "", description: "" });
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const formdata = new FormData();
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("userName", userName);
      formdata.append("headline", headline);
      formdata.append("location", location);
      formdata.append("gender", gender);
      formdata.append("skills", JSON.stringify(skills));
      formdata.append("education", JSON.stringify(education));
      formdata.append("experience", JSON.stringify(experience));

      if (backProfileImage) {
        formdata.append("profileImage", backProfileImage);
      }
      if (backCoverImage) {
        formdata.append("coverImage", backCoverImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/user/updateprofile`,
        formdata,
        { withCredentials: true }
      );

      setUserData(result.data);
      setSaving(false);
      setEdit(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
      setEdit(false);
    }
  };
  return (
    <div className="w-full h-[100vh] fixed top-0 flex justify-center items-center z-[100]">

       <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage} />
         <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage} />
      <div className="w-full h-full bg-black opacity-0.5 absolute"></div>
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white absolute overflow-auto z-[200] shadow-lg rounded-lg">
        <div className="absolute right-[20px] top-[10px]">
          <RxCross2
            className="text-gray-500 w-[50px] h-[30px] font-bold cursor-pointer"
            onClick={() => setEdit(false)}
          />
        </div>
        <div className="w-full h-[140px] bg-gray-500 rounded-lg mt-[30px] overflow-hidden" onClick={()=>profileImage.current.click()}>
          <img src={frontProfileImage} alt="Cover preview" className="w-full h-full object-cover" />
          <FiCamera className="absolute right-0 cursor-pointer text-white" />
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative top-[-20px] left-[30px]">
          <img src={frontCoverImage } alt="Profile preview"  onClick={()=>coverImage.current.click()} className="w-full h-full object-cover" />
        </div>
        <div className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[172px] left-[83px] rounded-full flex justify-center items-center cursor-pointer">
          <FaPlus className="text-white" />
        </div>

        <form className="w-full flex flex-col justify-center items-center gap-[20px] mt-[10px]">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="User Name" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <input type="text" value={headline} onChange={(e) => setHeadLine(e.target.value)} placeholder="headline" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="gender(male/female/others)" className="w-full py-[5px] px-[5px] h-[50px] outline-none border-gray-700 text-gray-700 border-2 rounded-lg" />
          <div className="w-full p-3 border border-gray-300 rounded-xl bg-gray-300 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-blue-900 text-xl font-semibold">Skills</h1>
              
            </div>
            {Array.isArray(skills) && skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className=" w-full flex  justify-between  px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                    <span>{skill}</span>
                    <RxCross2
                      className= "  text-gray-500 w-[20px] h-[20px] font-bold cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full py-2 px-3 h-10 outline-none border border-gray-300 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>

            <div className="w-full p-3 border border-gray-300 rounded-xl bg-gray-300 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-blue-900 text-xl font-semibold">Education</h1>
              
            </div>
            {Array.isArray(education) && education.length > 0 && (
              <div className="flex flex-wrap gap-2 bg-gray-400">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between px-3 py-1.5 bg-blue-200 border-gray-200  text-sm text-gray-700 shadow-sm"
                  >
                    <div className="  w-full flex flex-col justify-between items-center gap-[10px]">
                    <div>College: {edu.college}</div>
                    <div>Degree: {edu.degree}</div>
                    <div>Field: {edu.field}</div>
                    </div>
                    <RxCross2  onClick={()=>removeEducation(edu)}className="text-gray-500 w-[20px] h-[20px] font-bold cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="College"
                value={newEducation.college}
                onChange={(e) =>
                  setNewEducation((prev) => ({ ...prev, college: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border-2 border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Degree"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation((prev) => ({ ...prev, degree: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Field"
                value={newEducation.field}
                onChange={(e) =>
                  setNewEducation((prev) => ({ ...prev, field: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addEducation}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-full p-3 border border-gray-300 rounded-xl bg-gray-300 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-blue-900 text-xl font-semibold">Experience</h1>
              
            </div>
            {Array.isArray(experience) && experience.length > 0 && (
              <div className="flex flex-wrap gap-2 bg-gray-400">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between px-3 py-1.5 bg-blue-200 border-gray-200  text-sm text-gray-700 shadow-sm"
                  >
                    <div className="  w-full flex flex-col justify-between items-center gap-[10px]">
                    <div>Title: {exp.title}</div>
                    <div>Company: {exp.company}</div>
                    <div>Description: {exp.description}</div>
                    </div>
                    <RxCross2  onClick={()=>removeExperience(exp)}className="text-gray-500 w-[20px] h-[20px] font-bold cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border-2 border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full py-2 px-3 h-10 outline-none border border-gray-600 text-gray-700 rounded-lg focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addExperience}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      <button
                type="button"
               
                className=" w-full  my -[10px] px-4 py-2 bg-blue-600  text-white rounded-lg text-sm font-medium"
              onClick={()=>handleSaveProfile()} disable={saving} > {saving ? "saving.." :"Save Profile"}</button>

      </div>
    </div>
  );
}

export default EditProfile;
