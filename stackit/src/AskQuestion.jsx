import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim())
    };
    console.log('Submitted Data:', data);
    // Send to API or store here
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto border border-white rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl">StackIt</h1>
          <div className="flex items-center gap-4">
            <a href="/">Home</a>
            <button>🔔</button>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </header>

        <h2 className="text-xl mb-4">Ask Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter question title"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>


        <Editor
        tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"
        value={description}
        init={{
            height: 200,
            menubar: false,
            plugins: 'link lists preview',
            toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent ',
            branding: false,   // Remove "Powered by Tiny"
            promotion: false   // Remove "Finish setting up" message
        }}
        onEditorChange={(newValue) => setDescription(newValue)}
        />

          </div>

          <div>
            <label className="block mb-1">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="e.g. react, javascript, html"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;