import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import { useAuthStore } from './store/authStore'

function App() {
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore()
  const [theme, setTheme] = useState('light');
  
  // toggle dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // check for and store dark mode setting
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
  }, []);


  /* *****************************START WEBSOCKET MGMT CODE****************************************** */
  const url = () => {
    if (window.location.protocol == 'https:'){
      return 'wss://' + window.location.host + '/ws/'
    } else {
      return 'ws://' + window.location.host + '/ws/'
    }
  };
  const [socketUrl, setSocketUrl] = useState(url);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('websocket opened')
      sendMessage(JSON.stringify({
        action: "list",
        request_id: new Date().getTime(),
      }))
    },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  /* ******************************END WEBSOCKET MGMT CODE******************************************* */

  const [data, setData] = useState('');


  // need this to parse websocket data from parent
  useEffect(() => {

    // check to see if websocket message waiting
    if (messageHistory.length) {
      // grab oldest message
      let oldestMessage = messageHistory[0];
      // console.log(oldestMessage);

      // pop (immutably) oldest message off array so don't run more than once per message
      // onMessageHistoryStateChange(messageHistory.slice(1));
      setMessageHistory(messageHistory.slice(1));

      let allData;
      allData = JSON.parse(oldestMessage.data);
      console.log('allData');
      console.log(allData);

      if (allData.action === "list") {
        // console.log("list");
        // console.log(allData.data);
        setData(allData.data);
      }
      else if (allData.action === "create") {
        // console.log("create");

        setData([
          ...data,
          allData.data
        ]);

      }
      else if (allData.action === "delete") {
        // console.log("delete");
        // console.log(allData.data);

        setData(data.filter((d) => d.id !== allData.data.id));

      }
      else if (allData.action === "update") {
        // console.log("update");
        // console.log(allData.data);

        setData(
          data.map((d) => {
            if (d.id === allData.data.id) {
              return allData.data;
            } else {
              return d;
            }
          })
        );

      }
      else {
        console.error("Unknown action in message received via websocket. Printing message:");
        console.error(allData);
      }
    }
  }, [messageHistory, data])

  const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout theme={theme} toggleTheme={toggleTheme} connectionStatus={connectionStatus} />} >
          <Route path="/" 
            element={<PrivateRoute>{<Home data={data} />}</PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App