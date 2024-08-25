import React, { useState,useEffect } from "react";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Text,
  Box,
  Dialog,
} from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { CiShare1 } from "react-icons/ci";
import { Share } from "./Share";
import axios from "axios";

export default function Post({post}) {
  const [likes_count, setLikeCount] = useState(0);
  const currentUrl = window.location.href;

  useEffect(()=>{
   axios.get(`http://localhost:3000/api/v1/like/${post._id}`,
  {
    
  }).then((response)=>setLikeCount(response.data.likes_count));

  },[])

  const handleClick =async()=>{
     axios.post(`http://localhost:3000/api/v1/liked/${post._id}`,{
     
  }).then((response)=>setLikeCount(response.data.likes_count));
    
  }

  return (
    <Box maxWidth='100%'>
       <Card className="mt-4 mr-4">
      <Flex gap="3" align="center" className="px-8 py-4">
        <Avatar
          src={post.user_image}
          radius="full"
          fallback="A"
        />
        <Flex direction="column" gap="1">
          <Heading as="h3" size="4">
            {post.user_name}
          </Heading>
          <Text color="gray" size="1">
            {post.createdAt}
          </Text>
        </Flex>
      </Flex>
      <Box maxWidth="640px" className="mx-14 ">
        <Card>
          <Text as="p" wrap="pretty" className="px-10 py-3">
           {post.post_text}
          </Text>
          <Box className="image-container " mx="auto">
            <img
              className="post-image border rounded-xl"
              alt="your post"
              src={post.post_url}
            />
          </Box>
          <Flex
            justify="between"
            direction="row"
            align="center"
            className="m-3"
          >
            <Button
              onClick={handleClick}
              className={
                "rounded-full  h-0 flex px-2 py-4  hover:text-gray-800 bg-transparent dark:bg-white"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <div className="text-black">{likes_count}</div>
            </Button>
            <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>
                    <CiShare1 />
                    Share
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth='240px'>
              <Dialog.Title>Share With</Dialog.Title>
                <Share shareUrl={currentUrl} />
            </Dialog.Content>
        </Dialog.Root>
          </Flex>
        </Card>
      </Box>
      
    </Card>
    </Box>
       
  )
}