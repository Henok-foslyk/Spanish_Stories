import { useState } from 'react';
import axios from 'axios';

function Generator() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate', { prompt });
      setStory(res.data);
    } catch (err) {
      console.error('Error generating story:', err);
      alert('Failed to generate story');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2>Generate Spanish Story</h2>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Un dragón que baila"
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button onClick={generateStory} style={{ marginTop: '1rem' }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {story && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{story.title}</h3>
          <p>{story.text}</p>
          <audio controls src={story.audioUrl} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default Generator;
