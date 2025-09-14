import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "flowbite-react";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";

export default function PostDetails() {
  const { id } = useParams();
  async function getSinglePost() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );

    return data;
  }

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: getSinglePost,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <>
        <Alert
          className="my-4 max-wd-md mx-auto"
          color="failure"
          icon={HiInformationCircle}
        >
          {error.response.data.error}
        </Alert>
      </>
    );

  console.log(data);

  return <PostItem post={data?.post}/>;
}
