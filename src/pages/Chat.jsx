import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, User } from 'lucide-react';
import chatService from '../utils/chatService';
import { storage } from '../utils/localStorage';
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { ToastContainer } from 'react-toastify';

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);
    const currentUser = storage.getUserData();
  
    useEffect(() => {
      const newSocket = chatService.connect(currentUser);
      if (newSocket) {
        setSocket(newSocket);
  
        newSocket.on('connect', () => {
          setIsConnected(true);
        });
  
        newSocket.on('disconnect', () => {
          setIsConnected(false);
          setActiveUsers([]);
        });
  
        newSocket.on('users:active', (users) => {
          setActiveUsers(users.filter(user => user.socketId !== newSocket.id));
        });
  
        newSocket.on('message:receive', (data) => {
          setMessages(prev => ({
            ...prev,
            [data.from]: [...(prev[data.from] || []), {
              content: data.message,
              fromSelf: false,
              timestamp: data.timestamp
            }]
          }));
        });
      }
  
      return () => chatService.disconnect();
    }, []);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    const handleSendMessage = (messageText) => {
      if (!selectedUser || !isConnected) return;
  
      chatService.sendMessage(selectedUser.socketId, messageText);
  
      setMessages(prev => ({
        ...prev,
        [selectedUser.socketId]: [...(prev[selectedUser.socketId] || []), {
          content: messageText,
          fromSelf: true,
          timestamp: new Date().toISOString()
        }]
      }));
    };
  
    return (
      <div className="flex h-[calc(100vh-2rem)] bg-gray-50 rounded-lg overflow-hidden shadow-lg">
        <div className="w-1/4 bg-white border-r border-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <MessageSquare className="mr-2 text-violet-500" />
            Active Users
            <span className={`ml-2 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          </h2>
          {isConnected ? (
            <UserList 
              users={activeUsers}
              onSelectUser={setSelectedUser}
              selectedUserId={selectedUser?.socketId}
            />
          ) : (
            <div className="text-center text-gray-500 mt-4">
              Connecting to server...
            </div>
          )}
        </div>
  
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.role}</p>
                  </div>
                </div>
              </div>
  
              <MessageList 
                messages={messages[selectedUser.socketId] || []}
                messagesEndRef={messagesEndRef}
              />
  
              <MessageInput 
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                disabled={!isConnected}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a user to start chatting</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export default Chat;