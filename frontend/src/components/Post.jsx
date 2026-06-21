import React, { useState } from 'react'
import dp from "../assets/download.jpg"
import moment from "moment"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { FaRegCommentDots } from "react-icons/fa"
import { RiShareForwardLine } from "react-icons/ri"

function Post({ id, author = {}, like = [], comment = [], description = "", image, createdAt }) {
  const [more, setMore] = useState(false)
  const [liked, setLiked] = useState(false)

  const fullName = `${author.firstName || "User"} ${author.lastName || ""}`.trim()
  const profileImage = author.profileImage || dp

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{fullName}</h3>
              <p className="text-sm text-gray-500">{author.headline || "Member"}</p>
              <p className="text-xs text-gray-500">{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition">
            ⋯
          </button>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className={`text-gray-700 leading-6 whitespace-pre-wrap ${!more ? "line-clamp-3" : ""}`}>
            {description}
          </p>
          {description?.length > 180 && (
            <button
              onClick={() => setMore((prev) => !prev)}
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              {more ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Image */}
        {image && (
          <div className="mt-4 overflow-hidden rounded-xl bg-gray-100">
            <img src={image} alt="Post visual" className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {liked ? <AiFillLike className="text-blue-600" /> : <AiOutlineLike />}
            <span>{like.length || 0}</span>
          </div>
          <span>{comment.length || 0} Comments</span>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            onClick={() => setLiked((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            {liked ? <AiFillLike className="text-blue-600" /> : <AiOutlineLike />}
            Like
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            <FaRegCommentDots />
            Comment
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            <RiShareForwardLine />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
