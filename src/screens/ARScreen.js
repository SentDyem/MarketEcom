import React, { useState, useEffect } from 'react';
import { ViroARScene, ViroNode, Viro3DObject } from 'react-viro';
import axios from 'axios';

const ARScreen = ({ apiUrl }) => {
  const [objectUrl, setObjectUrl] = useState(null);
  const [spawnPosition, setSpawnPosition] = useState([0, 0, -1]);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        const { objectUrl } = response.data;
        setObjectUrl(objectUrl);
      })
      .catch(error => {
        console.error('Error fetching object URL: ', error);
      });
  }, [apiUrl]);

  const handleSpawnObject = (position) => {
    setSpawnPosition(position);
  }

  return (
    <ViroARScene>
      {objectUrl && (
        <ViroNode position={[0, 0, -1]} onClick={handleSpawnObject}>
          <Viro3DObject source={objectUrl} position={spawnPosition} scale={[0.3, 0.3, 0.3]} />
        </ViroNode>
      )}
    </ViroARScene>
  );
}

export default ARScreen;