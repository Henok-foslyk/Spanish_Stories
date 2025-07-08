import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Library() {
  const [stories, setStories] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchStories() {
      const snapshot = await getDocs(collection(db, 'stories'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStories(data);
    }
    fetchStories();
  }, []);

  const handlePlay = (url) => {
    if (audioRef.current) {
      if (audioRef.current.src !== url) {
        audioRef.current.src = url;
      }
      audioRef.current.play();
      setCurrentAudio(url);
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <h2>Story Library</h2>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} style={{ display: 'none' }} />

      {stories.map((story) => (
        <div key={story.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{story.title}</h3>
          <p>{story.text}</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => handlePlay(story.audioUrl)}>
              {currentAudio === story.audioUrl ? 'Resume' : 'Play'}
            </button>
            <button onClick={handlePause} style={{ marginLeft: '1rem' }}>Pause</button>
            <div style={{ height: '5px', background: '#ddd', marginTop: '1rem' }}>
              <div style={{ height: '5px', background: '#3b82f6', width: `${progress}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Library;
