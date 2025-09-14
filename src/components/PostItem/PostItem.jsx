import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { formatDate } from "../../lib/FormatedDate";
import { Link, useLocation } from "react-router-dom";
import Comments from "../Comments/Comments";
import fallbackImg from "../../assets/images/noUser.svg";
import { MdInsertComment } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import CreateComment from "../Comments/CreateComment";
import HandleUpdateDelete from "../HandleUpdateDelete/HandleUpdateDelete";

export default function PostItem({ post }) {
  const loc = useLocation();
  const locationPath = loc.pathname.startsWith("/post");
  const [isOpen, setIsOpen] = useState(locationPath);

  const {
    _id,
    body,
    image,
    createdAt,
    user: { photo, name },
    comments,
  } = post;

  const lastComment = comments?.[comments.length - 1];
  const { commentCreator, content } = lastComment || {};
  return (
    <>
      <Card className="max-w-2xl mx-auto my-5">
        <div className="flex justify-between">
        <div className="flex  gap-3">
          <img src={photo} alt="" className="w-15 h-15 rounded-full" />
          <div>
            <span>{name}</span>
            <p>{formatDate(createdAt)}</p>
          </div>
        </div>
        <HandleUpdateDelete   isComment={false} itemId={_id} image={image}/>
        </div>

        <img src={image} alt="" />

        <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
        <div className="flex gap-3">
        <MdInsertComment fontSize={"25"}/>
        {comments?.length}
        </div>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className=""
          as={Link}
          to={`/postDetails/${_id}`}
        >
          Show Post
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <CreateComment post={_id}/>

        {comments.length!==0 && <div className="flex bg-gray-700 my-3 rounded-lg gap-3">
          <img
            src={commentCreator?.photo || fallbackImg}
            alt=""
            className="w-15 h-15 rounded-full"
            onError={(e) => (e.currentTarget.src = fallbackImg)}
          />
          <div>
            <span>{commentCreator?.name || "Unknown User"}</span>
            <p>{formatDate(lastComment?.createdAt || createdAt)}</p>
            <p className="font-semibold">{content || "No comments yet"}</p>
          </div>
        </div>}

        <Accordion collapseAll={!locationPath} alwaysOpen={locationPath}>
          <AccordionPanel>
            <AccordionTitle>Show More Comments</AccordionTitle>
            <AccordionContent>
              <Comments id={_id} />
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </Card>
    </>
  );
}
