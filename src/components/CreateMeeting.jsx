import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/localStorage';
import { useGetClassesQuery, useUpdateClassMutation } from '../redux/slices/apiSlice';
import { Loader2 } from 'lucide-react';

function CreateMeeting({ classId }) {
  const navigate = useNavigate();
  const role = storage.getUserRole();
  const [availableRooms, setAvailableRooms] = useState([])
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState();

  const { data: classesAll, isLoading, isError } = useGetClassesQuery();
  const [updateClass] = useUpdateClassMutation();

  const currentClass = classesAll?.find((x) => `:${x.id}` === classId);

  useEffect(() => {
    if (currentClass) {
      setAvailableRooms(currentClass.rooms || []);
    }
  }, [currentClass]);

  const handleError = (error) => {
    setError(error.message);
    setIsProcessing(false);
    setTimeout(() => setError(null), 5000); 
  };

  const createAndJoinMeeting = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      if (role === 'teacher') {
        const existingRoom = availableRooms?.find(room => room.classId === classId);

        if (existingRoom) {
          navigate(`/${role}/class/${classId}/room/${existingRoom.roomId}`);
          return;
        }

        const roomId = uuidv4();
        const newRoom = {
          roomId,
          classId,
          createdBy: storage.getUserId()
        };

        await updateClass({
          id: currentClass?.id,
          payload: { rooms: [...availableRooms, newRoom] }
        });

        navigate(`/${role}/class/${classId}/room/${roomId}`);
      } else {
        if (!availableRooms?.length) {
          throw new Error('No available rooms to join');
        }

        const roomId = availableRooms[0].roomId;
        await updateClass({
          id: classId,
          payload: {
            roomId,
            userId: storage.getUserId()
          }
        });

        navigate(`/${role}/class/${classId}/room/${roomId}`);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
        <span className="ml-2">Loading rooms...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">Error loading classes. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <button
        onClick={createAndJoinMeeting}
        disabled={isProcessing}
        className={`
          w-full px-4 py-2 rounded-md
          ${isProcessing
            ? 'bg-violet-400 cursor-not-allowed'
            : 'bg-violet-600 hover:bg-violet-700'
          }
          text-white font-medium
          transition duration-200
          flex items-center justify-center
        `}
      >
        {isProcessing && (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        )}
        {role === 'teacher' ? 'Create Meeting' : 'Join Meeting'}
      </button>
    </div>
  );
}

export default CreateMeeting;
