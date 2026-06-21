import React from 'react'
import dp from "../assets/download.jpg"
function Post({id, author,like, comment, description , image}) {
  return (
    <div className='w-full min-h-[500px]  bg-white'>
      <div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative top-[5px] left-[30px]">
                  <img src={author.profileImage || dp } alt="Profile" className="w-full h-full object-cover" onClick={() => setEdit(true)} />
                </div>

                <div></div>
      </div>

      <div>

      </div>
    </div>
  )
}

export default Post
