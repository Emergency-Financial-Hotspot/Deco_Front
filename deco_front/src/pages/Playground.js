import React from 'react';
import Editor from '@monaco-editor/react';
import './Playground.css';

const Playground = () => {
    return (
        <div className="playground-container">
            <h1>Code Playground</h1>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="// Write your code here..."
            />
        </div> 
    );
};

export default Playground;
