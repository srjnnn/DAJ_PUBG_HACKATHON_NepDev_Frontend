import React, { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="flex flex-col h-screen bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <span className="material-icons cursor-pointer">arrow_back</span>
        <h1 className="text-lg font-medium">Feedback</h1>
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        {/* Title */}
        <h2 className="font-bold text-lg text-red-900">
          Your feedback matters
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          It takes less than 60 second to complet
        </p>

        {/* Rating */}
        <p className="font-medium mb-2">How Was Your Overal Experience?</p>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-4xl ${
                star <= rating ? "text-green-500" : "text-green-200"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Feedback textarea */}
        <p className="font-medium mb-2">What Could’ve made it perfect?</p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="loved most of it! One small thing.."
          className="w-full h-28 p-3 rounded-lg border border-transparent bg-red-50 placeholder-pink-300 focus:outline-none mb-8"
        />

        {/* Submit button */}
        <button className="w-full py-3 rounded-lg bg-purple-500 text-white font-medium">
          Submit Feedback
        </button>
      </div>
    </div>
  );
}