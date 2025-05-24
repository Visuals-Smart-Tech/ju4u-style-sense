import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const questions = [
    {
      question: "What's your go-to outfit for a casual day out?",
      options: ["Jeans and a T-shirt", "A flowy dress", "Athleisure wear", "Something bold and trendy"],
    },
    {
      question: "What colors do you usually prefer?",
      options: ["Neutral tones", "Bright and bold colors", "Pastels", "Dark shades"],
    },
    {
      question: "What type of footwear do you prefer?",
      options: ["Sneakers", "Sandals", "Boots", "Formal shoes"],
    },
  ];

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers to Firestore
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        await setDoc(userDoc, { quizAnswers: answers }, { merge: true });
      }
      navigate('/account'); // Redirect to user dashboard
    }
  };

  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Style Quiz</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <ul className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index}>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleOptionChange(option)}
                  className="form-radio h-5 w-5 text-ju4u-coral"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleNext}
          className="mt-6 bg-ju4u-coral text-white py-2 px-4 rounded hover:bg-ju4u-coral-dark"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
