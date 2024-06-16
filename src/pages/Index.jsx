import { useState, useCallback, useEffect } from "react";
import { Box, Button, Container, Input, VStack, Text, HStack, Avatar } from "@chakra-ui/react";
import { FaUser, FaRobot } from "react-icons/fa";
import React from "react";

const Message = React.memo(({ message, userIconPosition, botIconPosition }) => (
  <HStack
    alignSelf={message.sender === "user" ? "flex-start" : "flex-end"}
    bg={message.sender === "user" ? "blue.100" : "gray.100"}
    borderRadius="md"
    p={2}
    mb={2}
    spacing={2}
  >
    {message.sender === "user" && userIconPosition === "left" && <Avatar icon={<FaUser />} />}
    <Text>{message.text}</Text>
    {message.sender === "user" && userIconPosition === "right" && <Avatar icon={<FaUser />} />}
    {message.sender === "bot" && botIconPosition === "left" && <Avatar icon={<FaRobot />} />}
    {message.sender === "bot" && botIconPosition === "right" && <Avatar icon={<FaRobot />} />}
  </HStack>
));

const mockMessages = [
  { text: "Hello! How can I help you today?", sender: "bot" },
  { text: "I need some information about your services.", sender: "user" },
  { text: "Sure! We offer a variety of services including web development, mobile app development, and more.", sender: "bot" },
  { text: "That's great! Can you tell me more about your web development services?", sender: "user" },
  { text: "Of course! We specialize in creating responsive and user-friendly websites.", sender: "bot" },
];

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userIconPosition, setUserIconPosition] = useState("left");
  const [botIconPosition, setBotIconPosition] = useState("left");

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: "user" }]);
      setInputValue("");
    }
  }, [inputValue]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={4} width="100%">
        <Box width="100%" height="60vh" overflowY="auto" border="1px solid #ccc" borderRadius="md" p={4}>
          {messages.map((message, index) => (
            <Message key={index} message={message} userIconPosition={userIconPosition} botIconPosition={botIconPosition} />
          ))}
        </Box>
        <HStack width="100%">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
        <HStack width="100%" justifyContent="space-between">
          <HStack>
            <Text>User Icon Position:</Text>
            <Button onClick={() => setUserIconPosition("left")} colorScheme={userIconPosition === "left" ? "blue" : "gray"}>
              Left
            </Button>
            <Button onClick={() => setUserIconPosition("right")} colorScheme={userIconPosition === "right" ? "blue" : "gray"}>
              Right
            </Button>
          </HStack>
          <HStack>
            <Text>Bot Icon Position:</Text>
            <Button onClick={() => setBotIconPosition("left")} colorScheme={botIconPosition === "left" ? "blue" : "gray"}>
              Left
            </Button>
            <Button onClick={() => setBotIconPosition("right")} colorScheme={botIconPosition === "right" ? "blue" : "gray"}>
              Right
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;