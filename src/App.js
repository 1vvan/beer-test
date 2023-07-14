import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import RecipePage from './components/RecipePage/RecipePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
