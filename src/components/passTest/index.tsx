import { useParams, useNavigate } from "react-router-dom";
import { useGetAllTestsQuery } from "../../store/api/tests.api";
import { useRef, useState } from "react";

export const TestPass = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetAllTestsQuery(id);
  const navigate = useNavigate()

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({});
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleAnswerClick = (questionId: string, answerText: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === answerText ? "" : answerText,
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestionId = data?.questions.find((q) => !selectedAnswers[q.id])?.id;
  
    if (unansweredQuestionId) {
      setValidationMessage("Please answer all questions before submitting");
      questionRefs.current[unansweredQuestionId]?.scrollIntoView({ behavior: "smooth" });
    } else {
      const updatedQuestions = data?.questions.map((question) => ({
        ...question,
        userAnswer: selectedAnswers[question.id] || "",
      }));
  
      localStorage.setItem("testResults", JSON.stringify(updatedQuestions));
  
      navigate(`/test/results/${id}`);
    }
  };
  

  if (isLoading) {
    return <div className="h-screen bg-gray-200 flex justify-center items-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="h-screen bg-gray-200 flex justify-center items-center">Error loading test</div>;
  }

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full sm:w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{data.description}</p>

        {validationMessage && (
          <div className="text-red-500 mb-4 text-center">{validationMessage}</div>
        )}

        <div className="space-y-6">
          {data.questions?.map((question) => (
            <div key={question.id} ref={(el) => (questionRefs.current[question.id] = el)} className="p-6 bg-blue-50 rounded-lg shadow-md mb-4">
              <p className="text-xl font-semibold text-gray-800 mb-4">{question.question}</p>
              <div className="space-y-4">
                {question.answers?.map((answer) => (
                  <div key={answer.text} className="flex items-center space-x-3">
                    <div
                      className="w-full border-solid border-2 border-gray-400 text-center pt-2 pb-2 rounded-lg shadow-md"
                      onClick={() => handleAnswerClick(question.id, answer.text)}
                      style={{
                        backgroundColor: selectedAnswers[question.id] === answer.text ? '#0088ff' : 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {answer.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-md hover:from-violet-600 hover:to-fuchsia-600"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
};
