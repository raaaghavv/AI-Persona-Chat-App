export default function SuggestedQuestions({ persona, setInputMsg }) {
  const suggestedQuestions = persona.suggestedQuestions;

  return (
    <div className="mt-6">
      <h2 className="flex items-center text-gray-800 font-semibold mb-3">
        <span className="mr-2">≡</span> Suggested Questions
      </h2>
      <div className="space-y-3">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => setInputMsg(q)}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 text-sm"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
