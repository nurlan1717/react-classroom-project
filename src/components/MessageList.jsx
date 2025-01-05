import React from 'react';
import { formatTime } from '../utils/dateUtils';

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.fromSelf
                ? 'bg-violet-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{msg.content}</p>
            <p className={`text-xs mt-1 ${msg.fromSelf ? 'text-violet-200' : 'text-gray-500'}`}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;