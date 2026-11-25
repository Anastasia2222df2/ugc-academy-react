import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const AGENCY_NAME = 'UGC Lab';
const APP_VERSION = 'v1.0';

export function App() {
  return (
    <BrowserRouter>
      <Header agencyName={AGENCY_NAME} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer agencyName={AGENCY_NAME} version={APP_VERSION} />
    </BrowserRouter>
  );
}

export default App;