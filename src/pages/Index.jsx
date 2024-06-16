import { useState, useCallback } from "react";
import { Box, Button, Container, Input, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";

const Message = React.memo(({ message }) => (
  <Box
    alignSelf={message.sender === "user" ? "flex-start" : "flex-end"}
    bg={message.sender === "user" ? "blue.100" : "gray.100"}
    borderRadius="md"
    p={2}
    mb={2}
  >
    <Text>{message.text}</Text>
  </Box>
));

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
            <Message key={index} message={message} />
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
      </VStack>
    </Container>
  );
};

export default Index;