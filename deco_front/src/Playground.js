import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Button } from "@/components/ui/button"; // Using shadcn/ui for styling
import axios from "axios";

const Playground = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(
    "📝 **Problem:** Sum of Two Numbers\n\nWrite a function that takes two numbers as input and returns their sum.\n\n### **Example:**\n```python\nInput: 3, 5\nOutput: 8\n```"
  );

  const editorOptions = {
    selectOnLineNumbers: true,
    theme: "vs-dark",
    fontSize: 14,
    automaticLayout: true,
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", {
        language,
        code,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error executing code.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel - Problem Statement */}
      <div className="w-1/3 p-6 bg-gray-900 text-white border-r border-gray-700 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Problem Statement</h1>
        <div className="bg-gray-800 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap text-gray-300">{problem}</pre>
        </div>
      </div>

      {/* Right Panel - Code Editor & Execution */}
      <div className="w-2/3 flex flex-col p-6 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Code Playground</h1>
        <div className="flex gap-4 mb-4">
          <select
            className="p-2 bg-gray-800 border rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <Button onClick={handleRunCode}>Run Code</Button>
        </div>
        <MonacoEditor
          height="50vh"
          language={language}
          value={code}
          options={editorOptions}
          onChange={setCode}
        />
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold">Output:</h3>
          <pre className="text-green-400">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Playground;
