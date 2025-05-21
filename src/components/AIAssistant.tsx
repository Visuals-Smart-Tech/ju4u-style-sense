
import React, { useState } from 'react';
import { Bot, X, Send, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your JU4U fashion assistant. I can help you find outfits, answer style questions, or provide recommendations. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  // Sample outfit suggestions
  const outfitSuggestions = [
    "Summer casual outfit ideas",
    "Office wear recommendations",
    "Date night look",
    "Accessories for a black dress"
  ];

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, {
      sender: 'user',
      text: input,
      timestamp: new Date()
    }]);
    
    // Clear input
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse;
      
      if (input.toLowerCase().includes('outfit') || input.toLowerCase().includes('wear')) {
        botResponse = "Based on your style preferences, I'd recommend pairing a relaxed oversized blazer with straight-leg jeans and minimal accessories for an effortless chic look. Would you like to see some examples?";
      } else if (input.toLowerCase().includes('size') || input.toLowerCase().includes('fit')) {
        botResponse = "For the most accurate size recommendation, I'd need your measurements. Generally, this brand runs true to size, but their tops tend to have a more relaxed fit.";
      } else {
        botResponse = "I'd be happy to help with that! Would you like me to show you some trending items in our collection that match your request?";
      }
      
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    
    // Simulate immediate send
    setMessages(prev => [...prev, {
      sender: 'user',
      text: suggestion,
      timestamp: new Date()
    }]);
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse = "Here are some personalized recommendations based on your request. I've selected items that match your style profile and would work well together.";
      
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating bubble */}
      <button 
        className="ai-assistant-bubble"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Fashion Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="ai-assistant-panel">
          {/* Header */}
          <div className="p-3 bg-ju4u-coral text-white flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Style Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '350px' }}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`${
                    message.sender === 'user' 
                      ? 'bg-ju4u-coral text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  } p-3 max-w-[85%]`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="mt-1 flex items-center justify-end">
                    {message.sender === 'bot' && (
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-white/20 rounded-full" aria-label="Thumbs up">
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button className="p-1 hover:bg-white/20 rounded-full" aria-label="Thumbs down">
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <span className="text-xs opacity-70 ml-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggestions */}
          <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
            {outfitSuggestions.map((suggestion, index) => (
              <button 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about styles, outfits, or sizes..."
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-ju4u-coral text-sm"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="bg-ju4u-coral hover:bg-ju4u-coral/90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
