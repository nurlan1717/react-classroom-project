import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../utils/localStorage';
import {
    useGetClassesQuery,
    useGetInvitationsQuery,
    useUpdateClassMutation,
    useUpdateInvitationMutation,
} from '../redux/slices/apiSlice';
import { Helmet } from 'react-helmet-async';
import MessagesImage from '../assets/svg/Messages.gif';
import Chat from './Chat';
import { MessageSquare, Bell } from 'lucide-react';

const Messages = () => {
    const [activeTab, setActiveTab] = useState('invitations');
    const { data: invitations, isLoading: isInvitationsLoading } = useGetInvitationsQuery();
    const { data: classes, isLoading: isClassesLoading } = useGetClassesQuery();
    const [updateInvitation] = useUpdateInvitationMutation();
    const [updateClasses] = useUpdateClassMutation();
    const userId = storage.getUserId();

    if (isInvitationsLoading || isClassesLoading) return <p>Loading...</p>;

    const filteredInvitations = invitations?.filter(
        (invitation) => invitation.studentId === userId
    )[0];

    const filteredClassId = filteredInvitations?.classId;
    const filteredClasses = classes?.filter((x) => `:${x.id}` === filteredClassId) || [];


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
            toast.success('Invitation accepted successfully!', { position: 'top-right' });
        } catch (error) {
            toast.error('Error accepting invitation. Please try again.', { position: 'top-right' });
        }
    };

    const handleReject = async (id) => {
        try {
            const updatedData = { status: 'rejected' };
            await updateInvitation({ id, updatedData }).unwrap();
            toast.success('Invitation rejected successfully!', { position: 'top-right' });
        } catch (error) {
            toast.error('Error rejecting invitation. Please try again.', { position: 'top-right' });
        }
    };

    const renderInvitations = () => {
        if (filteredClasses.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
                    <p className="text-gray-600 text-lg mb-4">No invitations available.</p>
                    <img src={MessagesImage} alt="Messages Illustration" className="w-1/3 opacity-75" />
                </div>
            );
        }

        return filteredClasses.map((message) => (
            <div
                key={message.id}
                className={`bg-white p-4 rounded-lg shadow-lg mb-4 border-l-4 ${
                    filteredInvitations?.status === 'accepted'
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
                            className={`px-2 py-1 rounded-full ${
                                filteredInvitations?.status === 'accepted'
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
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleReject(filteredInvitations.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-colors"
                        >
                            Reject
                        </button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Messages</title>
                <meta name="description" content="Classroom" />
                <meta name="author" content="Nurlan, Qerib" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/assets/image/google-classroom-icon.png" />
            </Helmet>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Messages</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab('invitations')}
                            className={`px-4 py-2 rounded-lg flex items-center ${
                                activeTab === 'invitations'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } transition-colors`}
                        >
                            <Bell className="mr-2" size={20} />
                            Invitations
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-2 rounded-lg flex items-center ${
                                activeTab === 'chat'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } transition-colors`}
                        >
                            <MessageSquare className="mr-2" size={20} />
                            Chat
                        </button>
                    </div>
                </div>

                {activeTab === 'invitations' ? renderInvitations() : <Chat />}
            </div>
            <ToastContainer />
        </>
    );
};

export default Messages;