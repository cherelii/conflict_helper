import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

function App() {
  const [what, setWhat] = useState('');
  const [context, setContext] = useState('');
  const [goal, setGoal] = useState('');
  const [character, setCharacter] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      generatePrompt();
      setCurrentStep(5);
    } else if (currentStep === 5) {
      getFeedback();
      setCurrentStep(7);
    }
  };

  // const styles = {
  //   container: {
  //     maxWidth: '1500px',
  //     margin: '0 auto',
  //     padding: '20px',
  //     backgroundColor: '#FFFCFC',
  //     minHeight: '100vh',
  //   },
  //   title: {
  //     textAlign: 'center',
  //     color: '#333',
  //     marginBottom: '30px',
  //   },
  //   section: {
  //     backgroundColor: '#FFFCFC',
  //     padding: '20px',
  //     borderRadius: '8px',
  //     marginBottom: '20px',
  //   },
  //   heading: {
  //     color: '#444',
  //     marginBottom: '10px',
  //   },
  //   textarea: {
  //     width: '100%',
  //     padding: '10px',
  //     borderRadius: '4px',
  //     border: '1px solid #ddd',
  //     marginBottom: '15px',
  //     minHeight: '100px',
  //     resize: 'vertical',
  //     backgroundColor: '#f9eeee'
  //   },
  //   button: {
  //     backgroundColor: '#ab7a7a',
  //     color: 'white',
  //     padding: '10px 20px',
  //     border: 'none',
  //     borderRadius: '4px',
  //     cursor: 'pointer',
  //     width: '100%',
  //     fontSize: '16px',
  //   },
  //   response: {
  //     backgroundColor: '#d8bbbb',
  //     padding: '15px',
  //     borderRadius: '4px',
  //     // border: '1px solid #ddd',
  //     marginTop: '10px',
  //   }
  // };


  const renderStep = () => {
    const commonTextFieldProps = {
      fullWidth: true,
      multiline: true,
      rows: 10,
      variant: 'outlined',
      fontSize: '14px',
      // helperText: "We will provide you the perspective and tone of the advice that you want",
      // sx: {backgroundColor: '#E6E0E9', },
      sx: {
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#E6E0E9',
          '& fieldset': {
            border: 'none',  // Removes the border
          },
          '&:hover fieldset': {
            border: 'none',  // Ensures the border is still removed on hover
          },
          '&.Mui-focused fieldset': {
            border: 'none',  // Ensures no border when focused
          },
        },
      },
      FormHelperTextProps: {
        sx: {
          color: '#49454F', // Customize the color of the helper text
          fontSize: '14px', // Adjust font size
          textAlign: 'center', // Center-align the text
          marginTop: '8px', // Add some spacing above the helper text
          // backgroundColor: '#FFFFFF',
        },
      },
    };

    let helperText = "";

    switch (currentStep) {
      case 1:
        helperText = "Share the details of your situation so we can assist better";
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000', textAlign: 'center'}} >
              Tell us what happened
            </Typography>
            <TextField 
              {...commonTextFieldProps}
              helperText={helperText}
              label="This weekend, I had an argument with my best friend when..."
              value={what}
              onChange={(e) => setWhat(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
    '&:hover': {
      backgroundColor: '#6142B3',
    },
    textTransform: 'none',
  }} onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 2:
        helperText = "Include details about everyone in the conflict for context";
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000', textAlign: 'center'}} >
              Please provide the context of the people involved
            </Typography>
            <TextField
              {...commonTextFieldProps}
              helperText={helperText}
              label="They tend to get irritated easily and ..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
    '&:hover': {
      backgroundColor: '#6142B3',
    },
    textTransform: 'none',
  }} onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 3:
        helperText = "What outcome are you hoping to achieve?";
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000', textAlign: 'center'}} >
              Let us know what your goal is
            </Typography>
            <TextField
              {...commonTextFieldProps}
              helperText={helperText}
              label="My goal is to preserve the friendship but let her know how I feel..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
    '&:hover': {
      backgroundColor: '#6142B3',
    },
    textTransform: 'none',
  }} onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 4:
        helperText = "We will respond with your preferred perspective and tone";
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000', textAlign: 'center'}} >
              Now, would you like advice of a friend, therapist, or someone else?
            </Typography>
            <TextField
              {...commonTextFieldProps}
              helperText={helperText}
              label="I want the advice from a therapist or friend..."
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
    '&:hover': {
      backgroundColor: '#6142B3',
    },
    textTransform: 'none',
  }} onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 5:
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',  marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000'}} >
              Our take
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1, mb: 3 }}>
              {prompt}
            </Box>
            <Typography variant="h6" gutterBottom>
              Any additional input or feedback?
            </Typography>
            <TextField
              {...commonTextFieldProps}
              label="I agree that..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
    '&:hover': {
      backgroundColor: '#6142B3',
    },
    textTransform: 'none',
  }} onClick={handleNext}>
              Get Action Plan
            </Button>
          </Box>
        );
      case 7:
        return (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',  marginTop: '100px'}}>
            <Typography sx={{ fontSize: '28px', marginBottom: 1.5, color: '#000000'}} >
              The Action Plan
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1, mb: 3 }}>
              {feedback}
            </Box>
            <Button
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: '#6750A4', color: 'white', fontSize: '14px', padding: '6px 16px', borderRadius: '20px', 
                '&:hover': {
                  backgroundColor: '#6142B3',
                },
                textTransform: 'none',}}
              color="primary"
              fullWidth
              onClick={() => {
                setCurrentStep(1);
                setWhat('');
                setContext('');
                setGoal('');
                setCharacter('');
                setPrompt('');
                setResponse('');
                setFeedback('');
              }}
            >
              Start Over
            </Button>
          </Box>
        );
      default:
        return null;
    }



    // switch (currentStep) {
    //   case 1:
    //     return (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Tell us what happened!</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={what}
    //           onChange={(e) => setWhat(e.target.value)}
    //           placeholder="This weekend, I had an argument with my best friend when..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Next</button>
    //       </div>
    //     );
    //   case 2:
    //     return (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Please provide the context of the people involved</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={context}
    //           onChange={(e) => setContext(e.target.value)}
    //           placeholder="They tend to get irritated easily and ..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Next</button>
    //       </div>
    //     );
    //   case 3:
    //     return (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Let us know what your goal is</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={goal}
    //           onChange={(e) => setGoal(e.target.value)}
    //           placeholder="My goal is to preserve the friendship but let her know how I feel..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Next</button>
    //       </div>
    //     );
    //   case 4:
    //     return (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Now, would you like advice of a friend, therapist, or someone else?</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={character}
    //           onChange={(e) => setCharacter(e.target.value)}
    //           placeholder="I want the advice from a therapist or friend..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Get Advice</button>
    //       </div>
    //     );
    //   case 5:
    //     return prompt && (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Our take</h2>
    //         <div style={styles.response}>{prompt}</div>
    //         <div style={styles.section}>
    //         <h2 style={styles.heading}>Any additional input or feedback?</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={response}
    //           onChange={(e) => setResponse(e.target.value)}
    //           placeholder="I liked..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Get Action Plan</button>
    //       </div>
    //         {/* <button style={styles.button} onClick={() => setCurrentStep(6)}>Provide Feedback</button> */}
    //       </div>
    //     );
    //   case 6:
    //     return (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>Any additional input or feedback?</h2>
    //         <textarea
    //           style={styles.textarea}
    //           value={response}
    //           onChange={(e) => setResponse(e.target.value)}
    //           placeholder="I liked..."
    //         />
    //         <button style={styles.button} onClick={handleNext}>Get Action Plan</button>
    //       </div>
    //     );
    //   case 7:
    //     return feedback && (
    //       <div style={styles.section}>
    //         <h2 style={styles.heading}>The Action Plan</h2>
    //         <div style={styles.response}>{feedback}</div>
    //         <button 
    //           style={styles.button} 
    //           onClick={() => {
    //             setCurrentStep(1);
    //             setWhat('');
    //             setContext('');
    //             setGoal('');
    //             setCharacter('');
    //             setPrompt('');
    //             setResponse('');
    //             setFeedback('');
    //           }}
    //         >
    //           Start Over
    //         </button>
    //       </div>
    //     );
    //   default:
    //     return null;
    // }
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 5, p: 3, bgcolor: '#fff', borderRadius: 0 }}>
      <Typography sx= {{position: 'absolute', top: 30, left: 30, fontSize: '18px' }} gutterBottom>
        Your <br /> Conflict <br /> Mediation <br /> Buddy
      </Typography>
      {renderStep()}
    </Box>
  );
  
  // return (
  //   <div style={styles.container}>
  //     <h1 style={styles.title}>Conflict Mediation Buddy</h1>
  //     <div style={styles.progress}>
  //       {/* Step {currentStep} of {currentStep >= 5 ? 7 : 4} */}
  //     </div>
  //     {renderStep()}
  //   </div>
  // );

  // return (
  //   <div style={styles.container}>
  //     <h1 style={styles.title}>Conflict Mediation Buddy</h1>

  //     <div style={styles.section}>
  //       <h2 style={styles.heading}>Tell us what happened!</h2>
  //       <textarea
  //         style={styles.textarea}
  //         value={what}
  //         onChange={(e) => setWhat(e.target.value)}
  //         placeholder="This weekend, I had an argument with my best friend when..."
  //       />

  //       <h2 style={styles.heading}>Please provide the context of the people involved</h2>
  //       <textarea
  //         style={styles.textarea}
  //         value={context}
  //         onChange={(e) => setContext(e.target.value)}
  //         placeholder="They tend to get irritated easily and ..."
  //       />

  //       <h2 style={styles.heading}>Let us know what your goal is</h2>
  //       <textarea
  //         style={styles.textarea}
  //         value={goal}
  //         onChange={(e) => setGoal(e.target.value)}
  //         placeholder="My goal is to preserve the friendship but let her know how I feel..."
  //       />

  //       <h2 style={styles.heading}>Now, would you like advice of a friend, therapist, or someone else?</h2>
  //       <textarea
  //         style={styles.textarea}
  //         value={character}
  //         onChange={(e) => setCharacter(e.target.value)}
  //         placeholder="I want the advice from a therapist or friend..."
  //       />

  //       <button 
  //         style={styles.button}
  //         onClick={generatePrompt}
  //       >
  //         Send
  //       </button>
  //     </div>

  //     {prompt && (
  //       <div style={styles.section}>
  //         <h2 style={styles.heading}>Our take</h2>
  //         <div style={styles.response}>{prompt}</div>
  //       </div>
  //     )}

  //     {prompt && (
  //       <div style={styles.section}>
  //         <h2 style={styles.heading}>Any additional input or feedback?</h2>
  //         <textarea
  //           style={styles.textarea}
  //           value={response}
  //           onChange={(e) => setResponse(e.target.value)}
  //           placeholder="I liked..."
  //         />
  //         <button 
  //           style={styles.button}
  //           onClick={getFeedback}
  //         >
  //           Get Action Plan
  //         </button>
  //       </div>
  //     )}

  //     {feedback && (
  //       <div style={styles.section}>
  //         <h2 style={styles.heading}>The Action Plan</h2>
  //         <div style={styles.response}>{feedback}</div>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default App;
