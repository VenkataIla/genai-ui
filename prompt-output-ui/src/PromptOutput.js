import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1', // Replace with your desired region
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
  });

  const comprehend = new AWS.Comprehend();

function PromptOutput() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleOutputChange = (event) => {
    setOutput(event.target.value);
  };

  const handleClearClick = () => {
    setPrompt('');
    setOutput('');
  };

  const handleSubmitClick = async () => {
    try {
      const params = {
        Text: prompt
      };

      const data = await comprehend.detectEntities(params).promise();

      // Process the response data to extract the desired information
      const entities = data.Entities.map(entity => entity.Text);

      setOutput('Detected entities: ' + entities.join(', '));
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while processing the prompt.');
    }
  
};


  return (
    <div className="prompt-output-container">
      <div className="left-panel">
        <textarea id="prompt" value={prompt} onChange={handlePromptChange} />
        <div className="button-container">
          <button onClick={handleClearClick}>Clear</button>
          <button onClick={handleSubmitClick}>Submit</button>
        </div>
      </div>
      <div className="right-panel">
        <textarea id="output" value={output} readOnly />
      </div>
    </div>
  );

}


export default PromptOutput;