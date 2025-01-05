import { useState, useEffect } from 'react';

export const useDevicePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [error, setError] = useState(null);

  const checkPermissions = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some(device => device.kind === 'videoinput');
      const hasAudioInput = devices.some(device => device.kind === 'audioinput');

      if (!hasVideoInput || !hasAudioInput) {
        return false;
      }

      // İzin durumunu kontrol et
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      return false;
    }
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermissions(true);
      setError(null);
    } catch (err) {
      console.error('Permission error:', err);
      setError(
        err.name === 'NotAllowedError'
          ? 'Camera and microphone access is blocked. Please allow access in your browser settings.'
          : 'An error occurred while requesting permissions. Please try again.'
      );
      setHasPermissions(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const hasDevices = await checkPermissions();
        if (hasDevices) {
          setHasPermissions(true);
          setError(null);
        } else {
          setError('No camera or microphone detected or permissions not granted.');
          setHasPermissions(false);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to check device permissions.');
        setHasPermissions(false);
      }
    };

    init();
  }, []);

  return { hasPermissions, error, requestPermissions };
};
