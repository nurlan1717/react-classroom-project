import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { storage } from '../utils/localStorage';
import { ZEGO_CONFIG } from '../utils/zegoConfig';

const VideoRoom = () => {
  const [error, setError] = useState(null);
  const [zegoInstance, setZegoInstance] = useState(null);
  const containerRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();

  const userData = storage.getUserData();

  useEffect(() => {
    let mounted = true;

    const initializeZego = async () => {
      try {
        if (zegoInstance) {
          console.warn('Zego instance already initialized.');
          return;
        }

        const container = containerRef.current;
        if (!container) {
          console.error('Container element is not available.');
          setError('Video container is not ready.');
          return;
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          ZEGO_CONFIG.appID,
          ZEGO_CONFIG.serverSecret,
          roomId,
          userData.id || Date.now().toString(),
          userData.name || 'Anonymous'
        );

        console.log('Kit Token:', kitToken);
        console.log('Room ID:', roomId);
        console.log('User Data:', userData);

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
            config: {
              role: userData.role === 'teacher' ? 'Host' : 'Cohost',
            },
          },
          showScreenSharingButton: userData.role === 'teacher',
          showPreJoinView: true,
          showUserList: true,
          showRoomDetailsButton: true,
          showLayoutButton: true,
          maxUsers: 50,
          layout: 'Grid',
          showRoomTimer: true,
          showLeavingView: true,
          onLeaveRoom: () => {
            if (mounted) {
              navigate(-1);
            }
          },
          onError: (error) => {
            console.error('Zego error:', error);
            if (mounted) {
              setError(`Failed to join the meeting: ${error.message || 'Unknown error'}`);
            }
          },
        });

        if (mounted) {
          setZegoInstance(zp);
        }
      } catch (err) {
        console.error('Failed to initialize meeting:', err);
        if (mounted) {
          setError(`Failed to initialize the meeting: ${err.message || 'Unknown error'}`);
        }
      }
    };

    if (containerRef.current) {
      initializeZego();
    } else {
      const interval = setInterval(() => {
        if (containerRef.current) {
          initializeZego();
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }

    return () => {
      mounted = false;
      if (zegoInstance) {
        zegoInstance.destroy();
      }
    };
  }, [roomId, userData, navigate, zegoInstance]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div
        id="video-container"
        className="w-full h-full"
        ref={containerRef}
      />
    </div>
  );
};

export default VideoRoom;
