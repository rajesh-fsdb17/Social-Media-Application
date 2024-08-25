import InputPost from "@/component/InputPost";
import ProfileCard from "@/component/ProfileCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClockLoader from "react-spinners/ClockLoader";
import { useRecoilValueLoadable } from "recoil";
import { PostsAtom } from "../store/atoms/PostAtom";
import Post from "@/component/Post";
import RecentUsers from "@/component/RecentUsers";
import { Grid } from '@mui/material';
import axios from "axios";
import React from "react"; // Make sure React is imported

const ViewPosts = () => {
  const PostsLoadable = useRecoilValueLoadable(PostsAtom);
  const [postIterator, setPostIterator] = React.useState([]);

  React.useEffect(() => {
    const fetchUserValues = async () => {
      if (PostsLoadable.state === "hasValue") {
        const posts = PostsLoadable.contents;

        if (Array.isArray(posts)) {
          const result = await Promise.all(
            posts.map(async (post) => {
              try {
                const response = await axios.get(`http://localhost:3000/api/v1/getUserDetails/${post.userId}`,{
                  headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                  }
                });
                const userValues = response.data;

                return {
                  user_image: userValues.user_image,
                  user_name: userValues.user_name,
                  createdAt: post.createdAt.substring(0,10),
                  post_url: post.post_url,
                  post_text: post.post_text,
                  _id: post._id,
                };
              } catch (error) {
                console.error("Error fetching user details:", error);
                return null;
              }
            })
          );
          setPostIterator(result.filter((post) => post !== null));
        }
      }
    };

    fetchUserValues();
  }, [PostsLoadable]);

  if (PostsLoadable.state === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader color="#36d7b7" />
      </div>
    );
  }

  if (PostsLoadable.state === "hasError") {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 ml-3 flex flex-col space-y-6">
        <ProfileCard />
        <RecentUsers />
      </div>

      <div className="flex-1 p-4 ml-8">
        <ScrollArea className="rounded-md border-black h-full">
          <InputPost />
          <Grid container justify="center" spacing={4}>
            {postIterator.map((post) => (
              <Grid item key={post._id}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ViewPosts;
