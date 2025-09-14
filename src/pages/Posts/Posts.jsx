import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Button } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";

export default function Posts() {
  const [page, setPage] = useState(1);

  async function getPosts() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=50&page=${page}&sort=-createdAt `,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );

    return data;
  }

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts", page],
    queryFn: getPosts,
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

  function handleNext() {
    if (
      data?.paginationInfo?.currentPage < data?.paginationInfo?.numberOfPages
    ) {
      setPage((prev) => prev + 1);
    }
  }

  function handlePrev() {
    // setPage((prev) => prev - 1);

    if (data?.paginationInfo?.currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  }

  return (
    <>
    <CreatePost/>
      {data &&
        data?.posts.map((post) => <PostItem key={post._id} post={post} />)}

      <div className="flex justify-center items-center gap-3 my-5">
        <Button
          onClick={handlePrev}
          disabled={data?.paginationInfo?.currentPage == 1}
        >
          Prev
        </Button>
        <p>{page}</p>
        <Button
          onClick={handleNext}
          disabled={
            data?.paginationInfo?.currentPage ==
            data?.paginationInfo?.numberOfPages
          }
        >
          Next
        </Button>
      </div>
    </>
  );
}
