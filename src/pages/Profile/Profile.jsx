import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import PostItem from "../../components/PostItem/PostItem";
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import { ChangePasswordModel } from "./ChangePasswordModel";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  async function getUserPosts() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userData._id}/posts`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile", userData?._id],
    queryFn: getUserPosts,
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

  return (
    <>
      <Card className="max-w-2xl mx-auto my-5">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <DropdownItem>
              <button
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Upload Photo
              </button>
            </DropdownItem>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt="Bonnie image"
            height="96"
            src={userData?.photo}
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <button
              onClick={() => setOpenModal(true)}

              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Change Password
            </button>
          </div>
        </div>
      </Card>
      {data.posts &&
        data.posts.map((post) => <PostItem post={post} key={post._id} />)}
        {openModal && <ChangePasswordModel openModal={openModal} setOpenModal={setOpenModal}/>}
    </>
  );
}
