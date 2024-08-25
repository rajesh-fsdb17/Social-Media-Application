import React, { useEffect, useState } from "react";
import { Avatar, Card, Flex, Heading, Text, Grid ,Box} from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import axios from "axios";

const RecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/recent-three",
          {
            headers: {
              'Authorization': "Bearer " + localStorage.getItem('token')
            }
          }
        );
        setRecentUsers(res.data.recentUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [recentUsers]);

  return (
    <Card>
      <Heading size="2" color="gray">
        Recent Users
      </Heading>
      <Box  className="mt-2">
        {recentUsers.map((recentUser) => (
          <User user={recentUser} key={recentUser._id} />
        ))}
      </Box>
    </Card>
  );
};

const User = ({ user }) => {
  return (
    <Grid columns="0.5fr 1fr 1fr" alignItems="center" gap="3" className="px-1 py-2">
      <Avatar
        src={user.user_image}
        radius="full"
        fallback="A"
        className="my-1"
      />
      <Flex direction="column" gap="1">
        <Heading as="h2" size="3">
          {user.user_name}
        </Heading>
        <Text color="gray" size="2">
          @{user.name}
        </Text>
      </Flex>
      <Button  variant="secondary">See Profile</Button>
    </Grid>
  );
};

export default RecentUsers;
