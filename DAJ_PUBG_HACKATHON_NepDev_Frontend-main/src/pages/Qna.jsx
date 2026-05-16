import { useState } from "react";
import { QnaList } from "../Js-elements/Questions";

const QnaPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const apiUrl = "https://daj-pubg-hackathon-nepdev-backend-5xg1.onrender.com/api/v1";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null); // new state for LLM API response

  const currentQuestion = QnaList[currentIndex];

  const handleSelect = async (option) => {
    setSelected(option);

    const updatedAnswers = [
      ...answers,
      { question: currentQuestion.question, answer: option },
    ];
    setAnswers(updatedAnswers);

    setTimeout(async () => {
      if (currentIndex + 1 < QnaList.length) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}/llmdata`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userData.email || "abcd",
              answers: updatedAnswers,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Server Error:", errorData);
            alert("Something went wrong! Please try again.");
            setLoading(false);
            return;
          }

          const data = await response.json();
          console.log("Server Response:", data);

          setResult(data.response); // save API response in state
          setCompleted(true);
          setLoading(false);
        } catch (error) {
          console.error("Network Error:", error);
          alert("Failed to send data! Check your connection.");
          setLoading(false);
        }
      }
    }, 200);
  };

  const progress = ((currentIndex + 1) / QnaList.length) * 100;

  if (completed) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-b from-[#DBE8F4] to-purple-200 px-4 py-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Quiz Completed!
        </h2>
        <p className="text-gray-700 text-center">
          Thank you for completing the diagnosis. Here are your results:
        </p>

        {/* Display API Result */}
        {result && (
          <div className="max-w-3xl w-full space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
              <p className="text-gray-600">{result.summary}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Severity Level</h3>
              <p className="text-yellow-700 font-semibold">{result.level}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{result.description}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setCurrentIndex(0);
            setAnswers([]);
            setSelected(null);
            setCompleted(false);
            setResult(null); // reset result when restarting
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DBE8F4] to-purple-200 px-4 py-6">
      {/* Header + Progress */}
      <div className="flex flex-col justify-start h-[28vh] items-center">
        <div className="qna-header text-3xl md:text-4xl font-extrabold mb-4 text-center text-gray-900">
          Diagnosis
        </div>
        {/* Progress bar */}
        <div className="w-full max-w-xl h-2 rounded-full bg-gray-300 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          Question {currentIndex + 1} of {QnaList.length}
        </div>
      </div>

      {/* Question + Options */}
      <div className="max-w-xl w-full h-[68vh] mx-auto flex flex-col justify-start pt-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 text-center">
          {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg border text-center text-lg transition-all
                ${
                  selected === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnaPage;
