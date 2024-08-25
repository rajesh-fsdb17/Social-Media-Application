import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, Flex, Heading, TextArea, TextField, Dialog } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/store/atoms/UserAtom';

const EditProfile = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newImg, setNewImg] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState(''); 
  const details = useRecoilValue(UserAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (!details || !details.name) {
      axios.get('http://localhost:3000/api/v1/user_details', {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then((res) => {
        const userDetails = res.data.details;
        setName(userDetails.name || '');
        setImg(userDetails.user_image || '');
        setWebsite(userDetails.user_website || '');
        setBio(userDetails.user_bio || '');
        setBirthdate(userDetails.user_birthdate || '');
        setAge(calculateAge(userDetails.user_birthdate || ''));
      });
    } else {
      setName(details.name);
      setImg(details.user_image);
      setWebsite(details.user_website);
      setBio(details.user_bio);
      setBirthdate(details.user_birthdate);
      setAge(details.user_age);
    }
  }, [details]);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthdateChange = (e) => {
    const selectedDate = e.target.value;
    setBirthdate(selectedDate);
    const calculatedAge = calculateAge(selectedDate);
    
    setAge(calculatedAge);
  };

  const handleImageSave = () => {
    setImg(newImg);
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entry = await axios.put('http://localhost:3000/api/v1/addUserDetials', {
        name: name,
        user_image: img,
        user_website: website,
        user_bio: bio,
        user_age: age
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      });

      if (entry) {
        toast.success("Edited Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      navigate('/posts');
    } catch (error) {
      console.error('Error uploading details:', error);
    }
  }

  return (
    <div className='py-4 pl-[12%]'>
      <Card className='max-w-4xl'>
        <Box className='mx-40 my-6'>
          <Heading color='gray' as='h2' weight='medium' className='mb-6'>Profile</Heading>
          <Box maxWidth="500px" className='mb-4'>
            <Card>
              <Flex justify='between' align='center'>
                <Flex gap="3" align="center">
                  <Avatar
                    size="5"
                    src={img}
                    radius="full"
                    fallback="X"
                  />
                  <Box>
                    <TextField.Root className='mb-2 h-6' radius='full' value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name" />
                  </Box>
                </Flex>
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Trigger asChild>
                    <Button radius='full' size='2' className='px-[10%]'>{img === '' ? 'Add Photo' : 'Change photo'}</Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit Profile Photo</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Enter the URL of the new profile photo.
                    </Dialog.Description>
                    <Flex direction="column" gap="3">
                      <TextField.Root
                        value={newImg}
                        onChange={(e) => setNewImg(e.target.value)}
                        placeholder="Enter image URL"
                      />
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close asChild>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <Button onClick={handleImageSave}>Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Card>
          </Box>
          <Heading color='gray' as='h2' weight='medium' className='mb-2'>Website</Heading>
          <TextField.Root placeholder="Website" className='max-w-lg rounded-lg mb-4 ' onChange={(e) => setWebsite(e.target.value)} value={website} />
          <Heading color='gray' as='h2' weight='medium' className='mb-2'>Bio</Heading>
          <TextArea placeholder="Type your Bio" className='max-w-lg rounded-lg mb-4' onChange={(e) => setBio(e.target.value)} value={bio} />
          <Flex align='center' justify='between'>
            <Box>
              <Heading color='gray' as='h2' weight='medium' className='mb-2'>Your Birthday</Heading>
              <input
                type='date'
                className='border border-gray-300 rounded-lg text-neutral-600 w-56 p-2 bg-white dark:bg-neutral-900 dark:border-gray-700'
                value={birthdate}
                onChange={handleBirthdateChange}
              />
            </Box>
            <Box>
              <Heading color='gray' as='h2' weight='medium' className='mb-2'>Age</Heading>
              <TextField.Root
                type='text'
                className='border border-gray-300 rounded-lg w-24 text-neutral-600 bg-white dark:bg-neutral-900 dark:border-gray-700'
                value={age}
                readOnly
              />
            </Box>
          </Flex>
          <Box className='mt-8 px-[10%] ml-[38%]'>
            <Button size='3' radius='full' onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default EditProfile;
