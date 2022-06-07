import { Avatar, Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function Profile () {
  return (
    <Flex
      align="center"
      ml="auto"
    >
      <HStack
        spacing="8"
        mx="8"
        pr="8"
        py="1"
        color="gray.300"
        borderRightWidth={1}
        borderColor="gray.700"
      >
        <Icon as={RiNotificationLine} fontSize="20" />
        <Icon as={RiUserAddLine} fontSize="20" />
      </HStack>
      <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text> Gustavo Delfim </Text>
          <Text color="gray.300" fontSize="small">
            gusttavodelfim@gmail.com
          </Text>
        </Box>
        <Avatar size="md" name="Gustavo Delfim" src="https://avatars.githubusercontent.com/u/2513279?v=4" />
      </Flex>
    </Flex>
  )
}