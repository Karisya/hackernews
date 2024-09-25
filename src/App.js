import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/news/:id" element={<NewsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
