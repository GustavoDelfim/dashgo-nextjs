import { Avatar, Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile ({showProfileData}: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text> Gustavo Delfim </Text>
          <Text color="gray.300" fontSize="small">
            gusttavodelfim@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Gustavo Delfim" src="https://avatars.githubusercontent.com/u/2513279?v=4" />
    </Flex>
  )
}