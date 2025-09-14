import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function HandleUpdateDelete({
  isComment = true,
  itemId,
  image,
}) {
  const { register, handleSubmit } = useForm();
  const [preview, setPreview] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [edit, setEdit] = useState(false);
  const { mutate: handleDeleteItem } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success(`${isComment ? "comment" : "post"} deleted succesfully`);
    },
    onError: () => {
      toast.error(`${isComment ? "comment" : "post"} deleted failed`);
    },
  });

  async function deleteItem() {
    const endPoint = isComment ? "comments" : "posts";
    return await axios.delete(
      `https://linked-posts.routemisr.com/${endPoint}/${itemId}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  const { mutate: handleUpdateItem } = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      toast.success(`${isComment ? "comment" : "post"} Updated succesfully`);
    },
    onError: () => {
      toast.error(`${isComment ? "comment" : "post"} Update failed`);
    },
  });

  async function updateItem(data) {
    if (isComment) {
      return await axios.put(
        `https://linked-posts.routemisr.com/comments/${itemId}`,
        data,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    } else {
      const formData = new FormData();
      formData.append("body", data.body);
      if (selectedImg) {
        formData.append("image", selectedImg);
      }
      return await axios.put(
        `https://linked-posts.routemisr.com/posts/${itemId}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    }
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedImg(file);
    }
  }

  return (
    <>
      <Dropdown inline label="">
        <DropdownItem
          onClick={() => setEdit(true)}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Edit
        </DropdownItem>

        <DropdownItem
          onClick={() => handleDeleteItem()}
          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Delete
        </DropdownItem>
      </Dropdown>
      {edit && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
          <form
            onSubmit={handleSubmit(handleUpdateItem)}
            className="bg-gray-700 w-2xl p-5"
          >
            {!isComment && (
              <>
                (
                <input
                  type="file"
                  {...register("image")}
                  hidden
                  id="fileImg"
                  onChange={handleChange}
                />
                {preview?
                <label htmlFor="fileImg">
                  <img src={preview} className="w-full mb-3" />
                </label>
                :
                <label htmlFor="fileImg">
                  <img src={image} className="w-full mb-3" />
                </label>}
                )
              </>
            )}

            <div className="mb-2 block">
              <Label htmlFor="comment">Your Comment</Label>
            </div>
            {isComment ? (
              <Textarea
                id="name"
                type="text"
                rows={3}
                className="mb-2"
                shadow
                placeholder="Leave a comment..."
                {...register("content")}
              />
            ) : (
              <Textarea
                id="name"
                type="text"
                rows={3}
                className="mb-2"
                shadow
                placeholder="Leave a comment..."
                {...register("body")}
              />
            )}
            <div className="flex gap-3">
              <Button type="submit">Update</Button>
              <Button onClick={() => setEdit(false)}>Close</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
