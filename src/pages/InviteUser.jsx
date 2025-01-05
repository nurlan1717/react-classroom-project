import React, { useState } from 'react';
import { useCreateInvitationMutation, useGetUsersQuery, useGetInvitationsQuery } from '../redux/slices/apiSlice';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ClassNavbar from './ClassNavbar';
import { toast, ToastContainer } from 'react-toastify';

const InviteUser = () => {
    const { id } = useParams();
    const filteredId = id?.replace(":", "")
    const [email, setEmail] = useState("");
    const [createInvitation] = useCreateInvitationMutation();
    const { data: users } = useGetUsersQuery();
    const { data: invitations } = useGetInvitationsQuery();

    const handleSearch = () => {
        if (!email) {
            toast.info("Please enter an email!");
            return;
        }

        const user = users?.find((user) => user.email === email);
        if (user) {
            const existingInvitation = invitations?.find(
                (invitation) => invitation.studentId === user.id && invitation.classId === id
            );

            if (existingInvitation) {
                toast.error("This user has already been invited to this class!");
                return;
            }

            createInvitation({
                classId: filteredId,
                studentId: user.id,
                status: "pending",
                expiresAt: "2024-02-01T23:59:59Z",
            })
                .then(() => toast.success("Invitation sent successfully!"))
                .catch(() => toast.error("Failed to send invitation"));
        } else {
            toast.error("User not found with this email!");
        }
    };

    return (
        <>
            <Helmet>
                <title>Invite Users</title>
                <meta name="description" content="Classroom" />
                <meta name="author" content="Nurlan, Qerib" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
            </Helmet>
            <ClassNavbar />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Invite User to Class</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Enter User Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter email address"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Send Invitation
                </button>
                <ToastContainer />
            </div>
        </>
    );
};

export default InviteUser;
