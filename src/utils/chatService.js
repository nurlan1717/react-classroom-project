import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

class ChatService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 3;
  }

  connect(currentUser) {
    try {
      this.socket = io('http://localhost:3001', {
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        timeout: 10000,
      });

      this.socket.on('connect_error', (error) => {
        this.reconnectAttempts++;
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          toast.error('Unable to connect to chat server. Please try again later.');
          this.socket.disconnect();
        }
      });

      this.socket.on('connect', () => {
        this.reconnectAttempts = 0;
        this.socket.emit('user:join', currentUser);
        toast.success('Connected to chat server');
      });

      this.socket.on('disconnect', () => {
        toast.warn('Disconnected from chat server');
      });

      return this.socket;
    } catch (error) {
      toast.error('Error connecting to chat server');
      console.error('Connection error:', error);
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(to, message) {
    if (!this.socket?.connected) {
      toast.error('Not connected to chat server');
      return;
    }
    
    this.socket.emit('message:private', { to, message });
  }
}

export default new ChatService();