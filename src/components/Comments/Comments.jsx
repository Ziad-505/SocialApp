import axios from "axios";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";

export default function Comments({ id }) {
  async function getComments() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}/comments`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return data;
  }
  const { isLoading, isError, error, data } = useQuery({
    querykey: ['comments'],
    queryFn: getComments,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <Alert
        className="my-4 max-wd-md mx-auto"
        color="failure"
        icon={HiInformationCircle}
      >
        {error.response.data.error}
      </Alert>
    );
  console.log(data);

  return <>
  {data?.comments.map((comment) => <CommentItem comment={comment} key={comment._id}/>)}
  </>;
}
