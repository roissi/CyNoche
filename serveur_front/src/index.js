// Importing necessary packages and components
import React from 'react'; // Core package for building user interfaces using React
import { createRoot } from 'react-dom/client'; // API to provide a Concurrent Mode root for rendering React components
import './styles/index.css'; // Importing global styles for my application
import App from './App'; // Main App component that includes the rest of my React application
import reportWebVitals from './test/reportWebVitals'; // Tool for measuring performance in my app
import { ChakraProvider } from '@chakra-ui/react'; // Provider for Chakra UI library that provides theme and context to all components
import './component/FontAwesomeIcons'; // Importing FontAwesome icons to be used in my application

// Getting the root element where the React app will be attached
const rootContainer = document.getElementById('root');

// Throwing an error if no root element found in my HTML (this should never actually happen if my public/index.html file is set up correctly)
if (!rootContainer) throw new Error('No root element found');

// Creating a Concurrent Mode root and attaching it to the root element
const root = createRoot(rootContainer);
root.render(
  // Wrapping my application with necessary providers and StrictMode.
  // StrictMode checks the application for potential problems (like deprecated API usage)
  // ChakraProvider allows you to use Chakra UI components in my application
  // App is the entry point to my application
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// Web Vitals is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web
// This line records and reports the "web vitals" of your app. This is useful for understanding the real-world performance of your app
// I can pass a function to reportWebVitals to handle these measurements (like logging or sending to an analytics endpoint)
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();