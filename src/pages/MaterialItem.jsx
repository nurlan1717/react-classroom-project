import React from 'react';
import { Heart } from 'react-feather';
import { useGetMaterialsQuery, useGetUsersQuery } from '../redux/slices/apiSlice';

const MaterialItem = () => {
    const { data: materials } = useGetMaterialsQuery();
    const { data: users } = useGetUsersQuery();

    if (!materials || materials.length === 0) {
        return <div>No materials available</div>;
    }

    return (
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
                                {material?.likes?.length > 0 ? (
                                    <div className="flex items-center">
                                        <Heart className="text-red-400" size={16} />
                                        <span className="text-gray-800">{material?.likes.length}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">No likes yet</span>
                                )}
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm font-bold">Comments:</span>
                            {material?.comments?.length > 0 ? (
                                <ul className="space-y-1">
                                    {material?.comments.map((comment) => {
                                        const user = users?.find((user) => user.id === comment.userId);
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
    );
};

export default MaterialItem;
