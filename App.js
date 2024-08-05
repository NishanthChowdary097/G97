import React from 'react';
import './App.css';
import * as components from './components'; 
import backgroundImage from './mg.jpg';

function App() {
  const [signIn, setSignIn] = React.useState(true);

  const toggle = (signInState) => {
    setSignIn(signInState);
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundImage: `url(${backgroundImage})`, // Background image added here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <components.Container>
        <components.SignUpContainer signinIn={signIn}>
          <components.Form>
            <components.Title>Create Account</components.Title>
            <components.Input type="text" placeholder='Name' />
            <components.Input type="email" placeholder='Email' />
            <components.Input type="password" placeholder='Password' />
            <components.Button>Sign Up</components.Button>
          </components.Form>
        </components.SignUpContainer>
        <components.SignInContainer signinIn={signIn}>
          <components.Form>
            <components.Title>Sign In</components.Title>
            <components.Input type="email" placeholder='Email' />
            <components.Input type="password" placeholder='Password' />
            <components.Anchor href='#'>Forgot your password?</components.Anchor>
            <components.Button>Sign In</components.Button>
          </components.Form>
        </components.SignInContainer>
        <components.OverlayContainer signinIn={signIn}>
          <components.Overlay signinIn={signIn}>
            <components.LeftOverlayPanel signinIn={signIn}>
              <components.Title>Welcome chefs!</components.Title>
              <components.Paragraph>
                Please login with your personal info
              </components.Paragraph>
              <components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </components.GhostButton>
            </components.LeftOverlayPanel>
            <components.RightOverlayPanel signinIn={signIn}>
              <components.Title>Hello, chefs!</components.Title>
              <components.Paragraph>
                Enter your personal details
              </components.Paragraph>
              <components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </components.GhostButton>
            </components.RightOverlayPanel>
          </components.Overlay>
        </components.OverlayContainer>
      </components.Container>
    </div>
  );
}

export default App;
