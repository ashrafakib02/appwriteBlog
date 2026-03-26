import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${id}`}
      className="w-full h-64 rounded-lg overflow-hidden shadow-md"
    >
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4 p-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-40 object-cover rounded-xl "
          />
        </div>
        <h2 className="text-lg font-semibold text-black">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
