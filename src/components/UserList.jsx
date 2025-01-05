import React from 'react';
import { User } from 'lucide-react';

const UserList = ({ users, onSelectUser, selectedUserId }) => {
  return (
    <div className="space-y-2">
      {users.map(user => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user)}
          className={`p-3 rounded-lg cursor-pointer flex items-center transition-colors ${
            selectedUserId === user.id ? 'bg-violet-100' : 'hover:bg-gray-100'
          }`}
        >
          <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;