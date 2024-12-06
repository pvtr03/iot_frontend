import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import Images from './Images';
import './App.css';

function App() {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertStatus, setAlertStatus] = useState(false);

  useEffect(() => {
    axios.get('https://iot-project-n2ue.onrender.com/sensor/status')
      .then(response => {
        setIsOn(response.data.status);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the sensor status!', error);
        setLoading(false);
      });

    axios.get('https://iot-project-n2ue.onrender.com/alert/status')
      .then(response => {
        setAlertStatus(response.data.status);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the alert status!', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (checked) => {
    setLoading(true);
    axios.post('https://iot-project-n2ue.onrender.com/sensor/switch')
      .then(() => {
        setIsOn(!isOn);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error switching the sensor status!', error);
        setLoading(false);
      });
  };

  const handleAlertChange = (checked) => {
    setLoading(true);
    axios.post('https://iot-project-n2ue.onrender.com/alert/switch')
      .then(() => {
        setAlertStatus(!alertStatus);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error switching the alert status!', error);
        setLoading(false);
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Switch
                      checked={isOn}
                      onChange={handleChange}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={30}
                      uncheckedIcon={null}
                      checkedIcon={null}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                    <div style={{ marginLeft: '10px', fontSize: '20px' }}>
                      {isOn ? 'Sensor is ON' : 'Sensor is OFF'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Switch
                      checked={alertStatus}
                      onChange={handleAlertChange}
                      onColor="#ff8686"
                      onHandleColor="#e62626"
                      handleDiameter={30}
                      uncheckedIcon={null}
                      checkedIcon={null}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                    <div style={{ marginLeft: '10px', fontSize: '20px' }}>
                      {alertStatus ? 'Alert Status is ON' : 'Alert Status is OFF'}
                    </div>
                  </div>
                  <Link to="/images">
                    <button className="minimal-button" style={{ marginTop: '20px' }}>Images</button>
                  </Link>
                </>
              )}
            </div>
          }
        />
        <Route path="/images" element={<Images />} />
      </Routes>
    </Router>
  );
}

export default App;