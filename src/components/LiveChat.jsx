import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaEnvelope } from 'react-icons/fa';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = async (response) => {
    setIsTyping(true);
    // Random delay between 1-3 seconds to simulate typing
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    setIsTyping(false);
    
    const botMessage = {
      type: 'bot',
      text: response,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatHistory(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatHistory(prev => [...prev, userMessage]);

    // Check for different types of messages
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ho') || 
        lowerMessage.includes('hello') || 
        lowerMessage.includes('hi') || 
        lowerMessage.includes('namaste')) {
      await simulateTyping('Hello! 👋 Thank you for reaching out. For immediate assistance, please contact us on WhatsApp: +977 9841234567 or visit our Contact Us section for more options.');
    } else if (lowerMessage.includes('inquiry') || 
               lowerMessage.includes('question') || 
               lowerMessage.includes('ask') || 
               lowerMessage.includes('help')) {
      await simulateTyping('For detailed inquiries, please visit our Contact Us section where you can find our email, phone numbers, and office location. You can also reach us through WhatsApp for quick responses.');
    } else {
      await simulateTyping('Thank you for your message! For the best assistance, please visit our Contact Us section or reach us on WhatsApp: +977 9841234567');
    }

    setMessage('');
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-green-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat with us</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200 transition-colors duration-300"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Button */}
            <div className="bg-gray-50 p-3 border-b">
              <button
                onClick={scrollToContact}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Go to Contact Section</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat; 