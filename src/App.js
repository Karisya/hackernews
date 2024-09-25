import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/news/:id" element={<NewsPage />} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
