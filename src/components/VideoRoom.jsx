import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { storage } from '../utils/localStorage';

const VideoRoom = () => {
  const [meetingInstance, setMeetingInstance] = useState(null);
  const containerRef = useRef(null);
  const { roomId } = useParams();
  const userData = {
    id: storage.getUserId(),
    name: storage.getUserRole(),
    role: storage.getUserRole(),
  };

  useEffect(() => {
    const initializeZego = async () => {
      const appID = 1904807675;
      const serverSecret = "1df9473939f4a314a5506eeb752e66a0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        userData.name
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (containerRef.current) {
        zp.joinRoom({
          container: containerRef.current,
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
        setMeetingInstance(zp);
      }

    };

    initializeZego();


    return () => {
      if (meetingInstance) {
        meetingInstance.destroy();
      }
    };
  }, [roomId, userData.name]);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default VideoRoom;