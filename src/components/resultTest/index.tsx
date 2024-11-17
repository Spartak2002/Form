import { useParams } from "react-router-dom";
import { useGetAllTestsQuery } from "../../store/api/tests.api";

export const TestResults = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useGetAllTestsQuery(id);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    if (error || !data) {
        return <div className="h-screen flex justify-center items-center">Error loading test results</div>;
    }


    const testResults = JSON.parse(localStorage.getItem("testResults") || "[]");


    const correctCount = data.questions.reduce((count, question) => {
        const userAnswer = testResults.find((q: any) => q.id === question.id)?.userAnswer;
        const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;
        return userAnswer === correctAnswer ? count + 1 : count;
    }, 0);

    return (
        <div className="h-screen bg-gray-200 p-6 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">{data.title} - Results</h2>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <p className="text-2xl font-semibold">
                    Correct Answers: {correctCount} / {data.questions.length}
                </p>
            </div>

            {data.questions.map((question) => {
                const userAnswer = testResults.find((q: any) => q.id === question.id)?.userAnswer;

                return (
                    <div key={question.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-xl font-semibold mb-3">{question.question}</p>
                        <ul>
                            {question.answers.map((answer) => {
                                const isUserAnswer = userAnswer === answer.text;
                                const isCorrectAnswer = answer.isCorrect;

                                let className = "p-2 rounded-lg";
                                if (isUserAnswer) {
                                    className += isCorrectAnswer
                                        ? " bg-green-200 text-green-800" 
                                        : " bg-red-200 text-red-800"; 
                                } else if (isCorrectAnswer) {
                                    className += " bg-green-100 text-green-700"; 
                                }

                                return (
                                    <li key={answer.text} className={className}>
                                        {answer.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};
