import React from 'react';
import './DeviceCard.css'; // Import the CSS file

const stateMapping = {
  1: 'POWERON_STATE',
  2: 'IDLE_STATE',
  3: 'TAPCARD_STATE',
  4: 'AUTHCARD_STATE',
  5: 'AUTHPASS_STATE',
  6: 'AUTHFAIL_STATE',
  7: 'PRE_START_STATE',
  8: 'START_STATE',
  9: 'PRE_STOP_STATE',
  10: 'STOP_STATE',
  11: 'CLOSE_STATE'
};

const DeviceCard = ({ data }) => {
  const currentState = stateMapping[data.currentState] || 'Unknown State';

  return (
    <div className="device-card">
      <h2 className="device-header">Device ID: {data.deviceId}</h2>
      <p className="device-info current-info"><span>Current:</span> {data.current} A</p>
      <p className="device-info vc-info"><span>V_C Value:</span> {data.vcValue}</p>
      <p className="device-info state-info"><span>Current State:</span> {currentState}</p>
      <p className="device-info state-info"><span>Current power:</span> {data.power}</p>
    </div>
  );
};

export default DeviceCard;
