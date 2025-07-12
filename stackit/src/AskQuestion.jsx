import { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { AppContent } from './Context/AppContext';


const AskQuestion = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
    const { backendURL, userData } = useContext(AppContent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: userData?.username, // 👈 pass username
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim().toLowerCase()),
    };

    try {
      const res = await axios.post(`${backendURL}/api/ques/create`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        alert("Question submitted successfully!");
        // Optionally reset
        setTitle('');
        setDescription('');
        setTags('');
      } else {
        alert("Failed to submit question: " + res.data.message);
      }
    } catch (err) {
      console.error("Error submitting question:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-md p-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">StackIt</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
          </div>
        </header>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Question Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter question title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <Editor
              tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"
              value={description}
              init={{
                height: 200,
                menubar: false,
                plugins: 'link lists preview',
                toolbar:
                  'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent',
                branding: false,
                promotion: false
              }}
              onEditorChange={(newValue) => setDescription(newValue)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. react, javascript, html"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AskQuestion;
