import React from "react";
import { formatDate } from "../../lib/FormatedDate";
import fallbackImg from "../../assets/images/noUser.svg";
import HandleUpdateDelete from "../HandleUpdateDelete/HandleUpdateDelete";
export default function CommentItem({ comment }) {
  const {
    content,
    commentCreator: { photo, name },
    createdAt,
    _id
  } = comment;
  return (
    <>
      <div className="flex flex-column bg-gray-700 my-3 rounded-lg gap-3">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={photo}
              alt=""
              className="w-15 h-15 rounded-full"
              onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
            <div>
              <span>{name}</span>
              <p>{formatDate(createdAt)}</p>
            </div>
          </div>

          <HandleUpdateDelete itemId={_id}/>
        </div>

        <p className="font-semibold ps-8">{content}</p>
      </div>
    </>
  );
}
