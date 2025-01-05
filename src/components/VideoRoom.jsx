import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { storage } from '../utils/localStorage';
import { useDevicePermissions } from '../hooks/useDevicePermissions';
import { ZEGO_CONFIG } from '../utils/zegoConfig';
import { Loader2 } from 'lucide-react';

const VideoRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zegoInstance, setZegoInstance] = useState(null);
  const containerRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { hasPermissions, error: permissionError, requestPermissions } = useDevicePermissions();
  
  const userData = storage.getUserData();

  useEffect(() => {
    let mounted = true;

    const initializeZego = async () => {
      try {
        if (!hasPermissions) {
          setError(permissionError);
          return;
        }

        setIsLoading(true);
        setError(null);

        if (!containerRef.current || zegoInstance) {
          return;
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          ZEGO_CONFIG.appID,
          ZEGO_CONFIG.serverSecret,
          roomId,
          userData.id || Date.now().toString(),
          userData.name || 'Anonymous'
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        
        if (!mounted) return;

        await zp.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
            config: {
              role: userData.role === 'teacher' ? 'Host' : 'Cohost',
            }
          },
          showScreenSharingButton: userData.role === 'teacher',
          showPreJoinView: true,
          showUserList: true,
          showRoomDetailsButton: true,
          showLayoutButton: true,
          maxUsers: 50,
          layout: "Grid",
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
              setError('Failed to join the meeting. Please check your camera and microphone permissions.');
            }
          }
        });

        if (mounted) {
          setZegoInstance(zp);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize meeting:', err);
        if (mounted) {
          setError('Failed to initialize the meeting. Please try again.');
          setIsLoading(false);
        }
      }
    };

    initializeZego();

    return () => {
      mounted = false;
      if (zegoInstance) {
        zegoInstance.destroy();
      }
    };
  }, [roomId, userData, navigate, hasPermissions, permissionError, zegoInstance]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        <span className="ml-2">Joining meeting...</span>
      </div>
    );
  }

  if (error || permissionError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-600 text-center mb-4">{error || permissionError}</p>
          {!hasPermissions && (
            <button
              onClick={requestPermissions}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200"
            >
              Allow Camera & Microphone Access
            </button>
          )}
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
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default VideoRoom;
