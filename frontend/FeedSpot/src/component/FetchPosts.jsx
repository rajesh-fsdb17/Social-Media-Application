import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PostsAtom } from '../store/atoms/PostAtom';
import axios from 'axios';

export default function FetchPosts(){
  const setPosts = useSetRecoilState(PostsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/posts",
          {
            headers: {
              'Authorization': "Bearer " + localStorage.getItem('token')
            }
          }
        );
        setPosts(res.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [setPosts]);

  return null;
};


