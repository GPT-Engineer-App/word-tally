import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const countWords = (text) => {
    const chineseCharacters = text.match(/[\u4e00-\u9fa5]/g) || [];
    const englishWords = text.match(/[a-zA-Z]+/g) || [];
    return chineseCharacters.length + englishWords.length;
  };

  const handleCountClick = () => {
    setWordCount(countWords(text));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileText = event.target.result;
      setText(fileText);
      setWordCount(countWords(fileText));
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Word Count Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your text here..."
            value={text}
            onChange={handleTextChange}
            className="mb-4"
          />
          <Input type="file" onChange={handleFileUpload} className="mb-4" />
          <Button onClick={handleCountClick} className="w-full mb-4">
            Count Words
          </Button>
          <div className="text-center">
            <strong>Word Count: </strong>{wordCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;