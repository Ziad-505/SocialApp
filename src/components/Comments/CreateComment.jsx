import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateComment({ post }) {
  const { register, handleSubmit } = useForm({});
  const queryClient = useQueryClient()
  const { mutate, data } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
        toast.success("Comment added successfully");
        queryClient.invalidateQueries(["postDetails", post])
    },
    onError: (error) => {
        console.log(error);
        toast.error("There is an error, please try again later");

        
    }
  });
  async function addComment(data) {
    console.log({...data, post});
    return await axios.post(`https://linked-posts.routemisr.com/comments`, {...data, post}, {
        headers:{
            token:localStorage.getItem("userToken"),
        }
    })
  }

  return (
    <form onSubmit={handleSubmit(mutate)}>
      <div className="mb-2 block">
        <Label htmlFor="comment">Your Comment</Label>
      </div>
      <TextInput
        id="name"
        type="text"
        rows={3}
        className="mb-2"
        shadow
        placeholder="Leave a comment..."
        {...register("content")}
      />
      <Button type="submit">Add Comment</Button>
    </form>
  );
}
