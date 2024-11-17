import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllTestsQuery, useUpdateTestMutation } from "../../store/api/tests.api";
import { ITests } from "../../types";

export const EditTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllTestsQuery(id); 
  const [updateTest] = useUpdateTestMutation();
  const [testData, setTestData] = useState<ITests | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setTestData(data);
    }
  }, [data]);

  const handleQuestionChange = (questionIndex: number, newQuestion: string) => {
    setTestData((prevData) => {
      if (!prevData) return prevData;
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        question: newQuestion,
      };
      return { ...prevData, questions: updatedQuestions };
    });
  };




  const handleAnswerChange = (questionId: string, answerIndex: number, newText: string) => {
    setTestData((prevData) => {
      if (!prevData) return prevData; 
  
      const updatedQuestions = prevData.questions.map((question) => {
        if (question.id === questionId) {
          const updatedAnswers = question.answers.map((answer, index) =>
            index === answerIndex ? { ...answer, text: newText } : answer
          );
          return { ...question, answers: updatedAnswers }; 
        }
        return question; 
      });
  
      return { ...prevData, questions: updatedQuestions }; 
    });
  };

  const handleSave = async () => {
    if (testData) {
      await updateTest(testData); 
      refetch(); 
      navigate("/dashboard");
    }
  };

  if (isLoading) {
    return <div className="h-screen bg-gray-200 flex justify-center items-center">Loading...</div>;
  }

  if (error || !testData) {
    return <div className="h-screen bg-gray-200 flex justify-center items-center">Error loading test</div>;
  }

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full sm:w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{testData.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{testData.description}</p>

        <div className="space-y-6">
          {testData.questions.map((question, questionIndex) => (
            <div key={question.id} className="p-6 bg-blue-50 rounded-lg shadow-md mb-4">
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                className="text-xl font-semibold text-gray-800 mb-4 p-2 w-full border rounded-md"
              />
              <div className="space-y-4">
                {question.answers.map((answer, answerIndex) => (
                  <div key={answer.text} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => handleAnswerChange(question.id, answerIndex, e.target.value)}
                      className="w-full border-solid border-2 border-gray-400 text-center pt-2 pb-2 rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-md hover:from-violet-600 hover:to-fuchsia-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
