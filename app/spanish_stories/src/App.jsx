import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Generator from './components/Generator';
import Library from './components/Library';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <nav>
          <Link to="/" style={{ marginRight: '1rem' }}>Generate Story</Link>
          <Link to="/library">Library</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Generator />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
