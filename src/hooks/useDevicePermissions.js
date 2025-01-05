import { useState, useEffect } from 'react';

export const useDevicePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [error, setError] = useState(null);

  const checkPermissions = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some(device => device.kind === 'videoinput');
      const hasAudioInput = devices.some(device => device.kind === 'audioinput');
      
      return hasVideoInput && hasAudioInput;
    } catch {
      return false;
    }
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      stream.getTracks().forEach(track => track.stop());
      setHasPermissions(true);
      setError(null);
    } catch (err) {
      setError('Please allow camera and microphone access to join the meeting');
      setHasPermissions(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const hasDevices = await checkPermissions();
      if (hasDevices) {
        requestPermissions();
      } else {
        setError('No camera or microphone detected');
        setHasPermissions(false);
      }
    };

    init();
  }, []);

  return { hasPermissions, error, requestPermissions };
};
