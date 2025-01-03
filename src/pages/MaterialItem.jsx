import React, { useState } from 'react';
import { Heart } from 'react-feather';
import { useCreateMaterialMutation, useGetMaterialsQuery, useGetUsersQuery, useUpdateMaterialMutation } from '../redux/slices/apiSlice';
import { storage } from '../utils/localStorage';
import { Helmet } from 'react-helmet-async';

const MaterialItem = () => {
    const { data: materials, refetch: refetchMaterials } = useGetMaterialsQuery();
    const [createMaterial] = useCreateMaterialMutation();
    const { data: users } = useGetUsersQuery();
    const [newMaterial, setNewMaterial] = useState({ title: '', description: '' });
    const userRole = storage.getUserRole();

    const handleAddMaterial = async () => {
        if (newMaterial.title && newMaterial.description) {
            await createMaterial({ ...newMaterial, likes: [], comments: [] }).unwrap();
            setNewMaterial({ title: '', description: '' });
            refetchMaterials();
        }
    };

    if (!materials || materials.length === 0) {
        return <div>No materials available</div>;
    }

    return (
        <>
            <Helmet>
                <title>Materials</title>
                <meta name="description" content="Classroom" />
                <meta name="author" content="Nurlan, Qerib" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="src/assets/image/google-classroom-icon.png" />
            </Helmet>
            <div>
                {userRole === "teacher" && (
                    <div className="p-4 mb-6">
                        <h2 className="text-lg font-bold mb-2">Add New Material</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newMaterial.title}
                            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <textarea
                            placeholder="Description"
                            value={newMaterial.description}
                            onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                            className="border p-2 rounded mb-2 w-full"
                        ></textarea>
                        <button
                            onClick={handleAddMaterial}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Material
                        </button>
                    </div>
                )}

                <ul className="space-y-4">
                    {materials.map((material) => (
                        <li
                            key={material.id}
                            className="p-4 mt-3 rounded-md hover:bg-gray-100 cursor-pointer transition duration-150 shadow-md"
                        >
                            <div>
                                <h3 className="font-medium text-lg">{material?.title || 'No title'}</h3>
                                <p className="text-sm text-gray-600 mb-2">{material?.description || 'No description'}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm font-bold">Likes:</span>
                                        <div
                                            className="flex items-center cursor-pointer"
                                            onClick={() => handleLike(material.id)}
                                        >
                                            <Heart className="text-red-400" size={16} />
                                            <span className="text-gray-800">{material?.likes?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm font-bold">Comments:</span>
                                    {material?.comments?.length > 0 ? (
                                        <ul className="space-y-1">
                                            {material?.comments.map((comment) => {
                                                const user = users?.find((u) => u.id === comment.userId);
                                                return (
                                                    <li key={comment.id} className="text-gray-700">
                                                        <strong>{user ? user?.username : 'Unknown User'}:</strong>{' '}
                                                        {comment?.content || 'No content'}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-500">No comments yet</span>
                                    )}
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div></>
    );
};

export default MaterialItem;
