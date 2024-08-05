// Import the necessary dependencies
import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AlgoReview({
  userData,
  prompt,
  setting,
  // onSuccess,
  // onStop, // Add onStop prop
}: {
  userData: any;
  prompt: string;
  setting: string;
  // onSuccess: (grade: string, reasoning: string) => void;
  // onStop: () => void; // Define onStop prop type
}) {
  // Model selector state
  const [model, setModel] = useState("claude-3-opus-20240229");
  const [isLoading, setIsLoading] = useState(false);

  // Chat hook to interact with the AI
  const { messages, input, setInput, handleSubmit } = useChat({
    api: "/api/algo",
    body: {
      userData: JSON.stringify(userData),
      model: model,
      setting: setting,
    },
  });
  
  const messageContents = messages.map((m) => m.content);

  
  // Set initial prompt on component mount
  useEffect(() => {
    setInput(prompt);
  }, [setInput, prompt]);

  // Function to handle successful response from AI
  const handleSuccess = () => {
    // Call the onSuccess callback if messages are available
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.content) {
        const { grade, explanation } = lastMessage.content;
        // onSuccess(grade, explanation);
      } else {
        console.error("Last message does not have the expected content");
        // onSuccess("N/A", "No reasoning provided");
      }
    } else {
      console.error("No messages found");
      // onSuccess("N/A", "No reasoning provided");
    }

    // Call the onStop callback
    // onStop();
  };

  // Function to handle form submission and success
  const handleSubmitAndSuccess = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit(e);
    setIsLoading(false);
    handleSuccess();
  };

  return (
    
    <div className="p-5 border-1 border-b-gray-300 border rounded-xl mb-4">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-5 w-full">
          {m.role === "user" ? "User: " : "AI: "} {m.content}
        </div>
      ))}
      <div className="">
        <form onSubmit={handleSubmitAndSuccess}>
          <Button type="submit">Draft Response</Button>
          <div className="mt-2">
            <Select onValueChange={(value) => setModel(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Claude Opus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="claude">Claude Opus</SelectItem>
                <SelectItem value="gpt-4-1106-preview">GPT-4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
}
