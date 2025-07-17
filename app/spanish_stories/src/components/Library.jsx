import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Library = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const snapshot = await getDocs(collection(db, 'stories'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStories(data);
    };

    fetchStories();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Story Library</h1>
      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        stories.map((story) => (
          <div key={story.id} style={{ marginBottom: '2rem' }}>
            <h2>{story.title}</h2>
            <p>{story.text}</p>
            {story.audioFilename ? (
              <audio controls style={{ width: '100%' }}>
                <source
                  src={`http://localhost:5001/audio/${story.audioFilename}`}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p style={{ color: 'red' }}>No audio available</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Library;
