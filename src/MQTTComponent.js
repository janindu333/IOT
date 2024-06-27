import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import DeviceCard from './DeviceCard';
import './MQTTComponent.css';

const MQTTComponent = () => {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const options = {
      connectTimeout: 4000,
      clientId: 'clientID_' + Math.random().toString(16).substr(2, 8),
      username: 'janindu',
      password: 'janindu',
      keepalive: 60,
      clean: true,
    };

    const client = mqtt.connect('wss://u5561ede.ala.dedicated.aws.emqxcloud.com:8084/mqtt', options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('test');
    });

    client.on('message', (topic, message) => {
      const payload = JSON.parse(message.toString());
      if (topic === 'test') {
        const newDeviceData = {
          deviceId: payload.deviceId,
          current: payload.current,
          vcValue: payload.vcValue,
          currentState: payload.currentState,
          power: payload.power,
          energySend: payload.energySend,
        };

        setDevices(prevDevices => {
          const index = prevDevices.findIndex(device => device.deviceId === newDeviceData.deviceId);
          if (index > -1) {
            const updatedDevices = [...prevDevices];
            updatedDevices[index] = newDeviceData;
            return updatedDevices;
          } else {
            return [...prevDevices, newDeviceData];
          }
        });
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const deleteDevice = (deviceId) => {
    setDevices(prevDevices => prevDevices.filter(device => device.deviceId !== deviceId));
  };

  const filteredDevices = devices.filter(device => 
    device.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="parent-container">
      <h1>MQTT Devices</h1>
      <input 
        type="text" 
        placeholder="Search by Device ID" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {filteredDevices.map(device => (
        <DeviceCard key={device.deviceId} data={device} onDelete={() => deleteDevice(device.deviceId)} />
      ))}
    </div>
  );
};

export default MQTTComponent;
