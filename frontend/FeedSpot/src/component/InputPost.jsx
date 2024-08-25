import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card,Heading } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';

const InputPost = () => {
  const [postText, setPostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageSave = () => {
    setIsDialogOpen(false);
  };

  const handlePostUpload = async () => {
    if (!postText || !imageUrl) {
      toast.error('Both text and image URL are required to post.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/post', {
        post_text:postText,
        post_url:imageUrl
      }, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
      });

      if (response.data) {
        toast.success('Post added successfully!');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      toast.error('An error occurred while posting. Please try again.');
    }
  };

  return (
    <Card className="mr-4 p-4 ">
      <div className="flex gap-3 items-center mb-4">
        <img
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          alt="Avatar"
          className="rounded-full w-10 h-10"
        />
        <input
          type="text"
          id="post-text"
          placeholder="What's Happening..?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="border p-2 rounded w-full text-black"
        />
      </div>
      <div className="flex justify-between ml-12 mr-1">
        <Button onClick={() => setIsDialogOpen(true)} >
          Add Photo
        </Button>
        <Button onClick={handlePostUpload} >
          Post
        </Button>
      </div>
      {isDialogOpen && (
        <Card className="mt-4 p-4">
          <Heading size='4' as='h2'>Enter Photo Link</Heading>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="border p-2 rounded w-full mt-2 text-black"
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setIsDialogOpen(false)} >
              Cancel
            </Button>
            <button onClick={handleImageSave} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default InputPost;
