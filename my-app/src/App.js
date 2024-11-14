import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [what, setWhat] = useState('');
  const [context, setContext] = useState('');
  const [goal, setGoal] = useState('');
  const [character, setCharacter] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');

  const generatePrompt = async () => {
    try {
      const res = await axios.post('http://localhost:4000/generate-prompt', { what, context, goal, character});
      setPrompt(res.data.prompt);
    } catch (error) {
      console.error(error);
    }
  };

  const getFeedback = async () => {
    try {
      const res = await axios.post('http://localhost:4000/get-feedback', { response });
      setFeedback(res.data.feedback);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    container: {
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#d8bbbb',
      minHeight: '100vh',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
    },
    section: {
      backgroundColor: '#d8bbbb',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    heading: {
      color: '#444',
      marginBottom: '10px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '15px',
      minHeight: '100px',
      resize: 'vertical',
      backgroundColor: '#f9eeee'
    },
    button: {
      backgroundColor: '#ab7a7a',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
    },
    response: {
      backgroundColor: '#d8bbbb',
      padding: '15px',
      borderRadius: '4px',
      // border: '1px solid #ddd',
      marginTop: '10px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Conflict Mediation Buddy</h1>

      <div style={styles.section}>
        <h2 style={styles.heading}>Tell us what happened!</h2>
        <textarea
          style={styles.textarea}
          value={what}
          onChange={(e) => setWhat(e.target.value)}
          placeholder="This weekend, I had an argument with my best friend when..."
        />

        <h2 style={styles.heading}>Please provide the context of the people involved</h2>
        <textarea
          style={styles.textarea}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="They tend to get irritated easily and ..."
        />

        <h2 style={styles.heading}>Let us know what your goal is</h2>
        <textarea
          style={styles.textarea}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="My goal is to preserve the friendship but let her know how I feel..."
        />

        <h2 style={styles.heading}>Now, would you like advice of a friend, therapist, or someone else?</h2>
        <textarea
          style={styles.textarea}
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder="I want the advice from a therapist or friend..."
        />

        <button 
          style={styles.button}
          onClick={generatePrompt}
        >
          Send
        </button>
      </div>

      {prompt && (
        <div style={styles.section}>
          <h2 style={styles.heading}>Our take</h2>
          <div style={styles.response}>{prompt}</div>
        </div>
      )}

      {prompt && (
        <div style={styles.section}>
          <h2 style={styles.heading}>Any additional input or feedback?</h2>
          <textarea
            style={styles.textarea}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="I liked..."
          />
          <button 
            style={styles.button}
            onClick={getFeedback}
          >
            Get Action Plan
          </button>
        </div>
      )}

      {feedback && (
        <div style={styles.section}>
          <h2 style={styles.heading}>The Action Plan</h2>
          <div style={styles.response}>{feedback}</div>
        </div>
      )}
    </div>
  );
}

export default App;
