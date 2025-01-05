import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/localStorage';
import { useGetClassesQuery, useUpdateClassMutation } from '../redux/slices/apiSlice';
import { Loader2 } from 'lucide-react';

function CreateMeeting({ classId }) {
  const navigate = useNavigate();
  const role = storage.getUserRole();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { data: classesAll, isLoading, isError } = useGetClassesQuery();
  const [updateClass] = useUpdateClassMutation();

  const cleanClassId = classId.replace(':', '');
  const currentClass = classesAll?.find((x) => x.id === cleanClassId);

  useEffect(() => {
    if (currentClass) {
      const rooms = currentClass.rooms?.map((room) => ({
        ...room,
        active: room.active ?? true,
        participants: room.participants ?? [],
      })) || [];
      setAvailableRooms(rooms);
    }
  }, [currentClass]);

  const handleError = (error) => {
    console.error('Error occurred:', error);
    setError(error.message || 'An unexpected error occurred');
    setIsProcessing(false);
    setTimeout(() => setError(null), 5000);
  };

  const createAndJoinMeeting = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      if (!currentClass) {
        throw new Error('Class data not found');
      }

      const existingRoom = availableRooms.find((room) => room.createdBy === storage.getUserId());

      if (role === 'teacher') {
        if (existingRoom) {
          // Öğretmen zaten bir oda oluşturmuş, ona yönlendirilir.
          navigate(`/${role}/class/${cleanClassId}/room/${existingRoom.roomId}`);
          return;
        }

        // Yeni oda oluşturuluyor.
        const roomId = uuidv4();
        const newRoom = {
          roomId,
          classId: cleanClassId,
          createdBy: storage.getUserId(),
          createdAt: new Date().toISOString(),
          active: true,
          participants: [storage.getUserId()],
        };

        const updatedRooms = [...availableRooms, newRoom];
        await updateClass({
          id: cleanClassId,
          updatedData: { rooms: updatedRooms },
        }).unwrap();

        navigate(`/${role}/class/${cleanClassId}/room/${roomId}`);
      } else {
        // Öğrenci aktif bir odaya katılmaya çalışıyor.
        const activeRoom = availableRooms.find((room) => room.active === true);

        if (!activeRoom) {
          throw new Error('No active room available to join');
        }

        if (activeRoom.participants?.includes(storage.getUserId())) {
          navigate(`/${role}/class/${cleanClassId}/room/${activeRoom.roomId}`);
          return;
        }

        const updatedRooms = availableRooms.map((room) => {
          if (room.roomId === activeRoom.roomId) {
            return {
              ...room,
              participants: [...(room.participants || []), storage.getUserId()],
            };
          }
          return room;
        });

        await updateClass({
          id: cleanClassId,
          updatedData: { rooms: updatedRooms },
        }).unwrap();

        navigate(`/${role}/class/${cleanClassId}/room/${activeRoom.roomId}`);
      }
    } catch (err) {
      console.error('Failed to create/join meeting:', err);
      handleError(err);
    } finally {
      setIsProcessing(false);
    }
  };

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
        className={`w-full px-4 py-2 rounded-md ${isProcessing ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'
          } text-white font-medium transition duration-200 flex items-center justify-center`}
      >
        {isProcessing && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {role === 'teacher' ? 'Create Meeting' : 'Join Meeting'}
      </button>
    </div>
  );
}

export default CreateMeeting;
