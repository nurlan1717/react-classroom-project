import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { storage } from '../utils/localStorage';

const VideoRoom = () => {
  const { roomId } = useParams();
  const userData = storage.getUserData();

  useEffect(() => {
    const initializeZego = async () => {
      const appID = 1904807675;
      const serverSecret = "1df9473939f4a314a5506eeb752e66a0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userData.id,
        userData.name
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: document.querySelector("#video-container"),
        sharedLinks: [{
          name: 'Copy Link',
          url: window.location.href,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: userData.role === 'teacher',
        showPreJoinView: true,
        showUserList: true,
      });
    };

    initializeZego();
  }, [roomId, userData]);

  return (
    <div className="h-screen bg-gray-100">
      <div id="video-container" className="h-full w-full"></div>
    </div>
  );
};

export default VideoRoom;