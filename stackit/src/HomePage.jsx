const HomePage = () => {
  const user = {
    name: 'Paraj Mehta',
    // avatar: 'https://i.pravatar.cc/150?img=3',
    questions: [
      {
        id: 1,
        title: 'How to center a div in Tailwind?',
        description: 'I m trying to center a div both vertically and horizontally using Tailwind. What is the best way?',
        answers: [
          'You can use flex with justify-center and items-center on the parent.',
          'Try using grid with place-items-center for both axis alignment.'
        ]
      },
      {
        id: 2,
        title: 'What is useEffect in React?',
        description: 'I dont fully understand how useEffect works. Can someone explain it with an example?',
        answers: [
          'useEffect lets you perform side effects in function components, like data fetching or event listeners.',
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            /> */}
            <h1 className="text-2xl font-bold text-blue-600">Welcome, {user.name}</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Ask a New Question
          </button>
        </div>

        {/* Questions with Descriptions and Answers */}
        <div className="space-y-6">
          {user.questions.map((q) => (
            <div key={q.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900">{q.title}</h2>
              <p className="text-gray-700 mt-2">{q.description}</p>

              {/* Answers */}
              {q.answers && q.answers.length > 0 ? (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Answers:</h3>
                  <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                    {q.answers.map((ans, index) => (
                      <li key={index}>{ans}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No answers yet.</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;