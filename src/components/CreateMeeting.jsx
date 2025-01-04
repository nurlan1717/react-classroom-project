import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/localStorage';

const CreateMeeting = ({ classId }) => {
  const navigate = useNavigate();
  const role = storage.getUserRole();

  const createAndJoinMeeting = () => {
    const roomId = uuidv4();
    navigate(`/${role}/class/${classId}/room/${roomId}`);
  };

  return (
    <button
      onClick={createAndJoinMeeting}
      className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition duration-200"
    >
      {role === 'teacher' ? 'Create Meeting' : 'Join Meeting'}
    </button>
  );
};

export default CreateMeeting;