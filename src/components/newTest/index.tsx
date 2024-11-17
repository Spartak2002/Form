import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { IQuestion, IAnswer, ITests } from '../../types';
import { createTestAsync } from '../../store/features/testsSlice';
import { useNavigate } from 'react-router-dom';

export const CreateTestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [testTitle, setTestTitle] = useState<string>('');
  const [testDescription, setTestDescription] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestDescription(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestion: IQuestion = {
      id: Date.now().toString(),
      question: '',
      answers: [],
      correctAnswer: '',
      userAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleAddAnswer = (questionId: string) => {
    const newAnswer: IAnswer = {
      id: Date.now().toString(),
      text: '',
      isCorrect: false,
    };

    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      )
    );
  };

  const handleDeleteAnswer = (questionId: string, answerId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, answers: q.answers.filter((a) => a.id !== answerId) }
          : q
      )
    );
  };

  const handleSetCorrectAnswer = (questionId: string, answerId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctAnswer: q.correctAnswer === answerId ? '' : answerId,
              answers: q.answers.map((a) => ({
                ...a,
                isCorrect: a.id === answerId ? !a.isCorrect : false,
              })),
            }
          : q
      )
    );
  };

  const handleSubmit = () => {
    if (!testTitle || !testDescription || questions.length === 0) {
      alert('Please fill out all fields.');
      return;
    }

    for (const question of questions) {
      if (!question.question.trim() || question.answers.length === 0) {
        alert('Each question must have text and at least one answer.');
        return;
      }

      const correctAnswers = question.answers.filter((a) => a.isCorrect);
      if (correctAnswers.length !== 1) {
        alert('Each question must have exactly one correct answer.');
        return;
      }
    }

    const newTest: ITests = {
      id: Date.now().toString(),
      title: testTitle,
      description: testDescription,
      questions,
    };

    dispatch(createTestAsync(newTest));
    navigate('/dashboard');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Create a New Test</h1>

      <div className="mb-6">
        <label htmlFor="testTitle" className="block text-lg font-medium text-gray-700">Test Title</label>
        <input
          type="text"
          id="testTitle"
          value={testTitle}
          onChange={handleTitleChange}
          placeholder="Enter test title"
          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="testDescription" className="block text-lg font-medium text-gray-700">Test Description</label>
        <input
          type="text"
          id="testDescription"
          value={testDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter test description"
          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="border p-4 rounded-md mb-6 bg-gray-50">
          <div className="mb-4">
            <label htmlFor={`question-${question.id}`} className="block text-lg font-medium text-gray-700">Question</label>
            <input
              type="text"
              id={`question-${question.id}`}
              value={question.question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
              placeholder="Enter question text"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {question.answers.map((answer, idx) => (
            <div key={answer.id} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                value={answer.text}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].answers[idx].text = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                placeholder="Enter answer text"
                className={`p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${answer.isCorrect ? 'bg-green-100' : ''}`}
                onDoubleClick={() => handleSetCorrectAnswer(question.id, answer.id)}
              />
              <button
                onClick={() => handleDeleteAnswer(question.id, answer.id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash-alt">Delete</i>
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={() => handleAddAnswer(question.id)}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Answer
            </button>

            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete Question
            </button>

            <button
              onClick={() => {
                const newQuestion = { ...question, id: Date.now().toString() };
                setQuestions([...questions, newQuestion]);
              }}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Duplicate Question
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white p-3 rounded-md mb-6 w-full hover:bg-blue-600 focus:outline-none"
      >
        Add New Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 focus:outline-none"
      >
        Submit Test
      </button>
    </div>
  );
};
