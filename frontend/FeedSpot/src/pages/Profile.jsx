import { Avatar, Box, Button, Card, Flex, Heading, Text, TextArea, TextField } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/store/atoms/UserAtom';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const detials = useRecoilValue(UserAtom);
  const navigate = useNavigate();

  
    
  return (
    <div className='py-4 pl-[12%]'>
      <Card className='max-w-4xl'>
        <Box className='mx-40 my-6'>
          <Heading color='gray' as='h2' weight='medium' className='mb-6'>Profile</Heading>
          <Box maxWidth="500px" className='mb-4 '>
            <Card>
              <Flex justify='between' align='center'>
                <Flex gap="3" align="center">
                  <Avatar
                    size="5"
                    src={detials.user_image}
                    radius="full"
                    fallback="T"
                  />
                  <Box>
                    
                    <Text as="div" size="2" color="gray">
                      {detials.user_name}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                      @{detials.name}
                    </Text>
                  </Box>
                </Flex>
                {/* <Button radius='full' size='2' className='px-[10%]'>Change photo</Button> */}
              </Flex>
            </Card>
          </Box>
          <Heading color='gray' as='h2' weight='medium' className='mb-2'  >Website</Heading>
          <TextField.Root placeholder="Website" className='max-w-lg rounded-lg mb-4 bg-gray-100' value={detials.user_website}/>
          <Heading color='gray' as='h2' weight='medium' className='mb-2'>Bio</Heading>
          <TextArea placeholder="Type your Bio" className='max-w-lg rounded-lg mb-4 bg-gray-100' value={detials.user_bio}/>
          <Flex align='center' justify='between'>
            <Box>
              <Heading color='gray' as='h2' weight='medium' className='mb-2'>Your Birthday</Heading>
              <TextField.Root 
                className='border rounded-lg outline-none w-56 bg-gray-100'
                placeholder={'09/09/3003'}
              />
            </Box>
            <Box>
              <Heading color='gray' as='h2' weight='medium' className='mb-2'>Age</Heading>
              <TextField.Root 
                className='border rounded-lg outline-none w-24 bg-gray-100'
                value={detials.user_age}
                readOnly
              />
            </Box>
          </Flex>
          <Box className='mt-8 px-[10%] ml-[38%]'>
        <Button  onClick={()=>navigate('/editprofile')} size='4' radius='full' >Edit</Button>
        </Box>
        </Box>
        
      </Card>
    </div>
  );
}

export default Profile;

//set the username,avatar,name dynamic

