import React from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ message, setMessage, onSend, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-200">
      <div className="flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "Disconnected from server..." : "Type your message..."}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-violet-500 hover:bg-violet-600 text-white'
          }`}
          disabled={disabled}
        >
          <Send size={20} className="mr-2" />
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;