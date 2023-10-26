import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.css';
import NewsDetail from "./pages/NewsDetail";

const App = ({ breakpoint }) => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:categoryId" element={<HomePage />} />
                    <Route path="/news/:newsId" element={<NewsDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;