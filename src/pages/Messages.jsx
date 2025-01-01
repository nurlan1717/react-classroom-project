import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../utils/localStorage';
import {
    useGetClassesQuery,
    useGetInvitationsQuery,
    useUpdateClassMutation,
    useUpdateInvitationMutation,
} from '../redux/slices/apiSlice';

const Messages = () => {
    const { data: invitations } = useGetInvitationsQuery();
    const { data: classes } = useGetClassesQuery();
    const [updateInvitation] = useUpdateInvitationMutation();
    const [updateClasses] = useUpdateClassMutation();
    const userId = storage.getUserId();

    if (!invitations || !classes) return <p>Loading...</p>;

    const filteredInvitations = invitations?.filter(
        (invitation) => invitation.studentId === userId
    )[0];

    const filteredClassId = filteredInvitations?.classId;

    const filteredClasses = classes.filter((x) => x.id === filteredClassId);

    const handleAccept = async (id) => {
        try {
            const updatedData = { status: 'accepted' };
            await updateInvitation({ id, updatedData }).unwrap();
                const selectedClass = classes.find((cls) => cls.id === filteredClassId);
            if (!selectedClass) throw new Error('Class not found');
            const updatedClassData = {
                studentIds: [...selectedClass.studentIds, userId], 
            };
            await updateClasses({ id: filteredClassId, updatedData: updatedClassData });
            toast.success('Accepted', { position: 'top-right' });
        } catch (error) {
            toast.error('Error accepting invitation', { position: 'top-right' });
        }
    };
    

    const handleReject = async (id) => {
        try {
            const updatedData = { status: 'rejected' };
            await updateInvitation({ id, updatedData }).unwrap();
            toast.success('Rejected', { position: 'top-right' });
        } catch (error) {
            toast.error('Error rejecting invitation', { position: 'top-right' });
        }
    };

    if (filteredClasses.length === 0) {
        return <p>No messages available.</p>;
    }

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Messages</h2>

            {filteredClasses.map((message) => (
                <div
                    key={message.id}
                    className={`bg-white p-4 rounded-lg shadow-lg mb-4 border-l-4 ${filteredInvitations?.status === 'accepted'
                            ? 'border-green-500'
                            : filteredInvitations?.status === 'rejected'
                                ? 'border-red-500'
                                : 'border-violet-500'
                        }`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <p className="font-semibold text-gray-800">{message.name}</p>
                            <p className="text-gray-600 text-sm">{message.major}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span
                                className={`px-2 py-1 rounded-full ${filteredInvitations?.status === 'accepted'
                                        ? 'bg-green-100 text-green-600'
                                        : filteredInvitations?.status === 'rejected'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-blue-100 text-blue-600'
                                    }`}
                            >
                                {filteredInvitations?.status === 'accepted'
                                    ? 'Accepted'
                                    : filteredInvitations?.status === 'rejected'
                                        ? 'Rejected'
                                        : 'Class Invite'}
                            </span>
                        </div>
                    </div>

                    {filteredInvitations?.status === 'pending' && (
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => handleAccept(filteredInvitations.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(filteredInvitations.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Messages;
