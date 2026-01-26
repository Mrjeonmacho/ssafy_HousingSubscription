import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import NoticesPage from "../pages/NoticesPage";
import Playground from "../pages/Playground/Playground";
import Quiz from "../pages/Playground/Quiz";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Preference from "../pages/Playground/Preference";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/playground">
            <Route index element={<Playground />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="preference" element={<Preference />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
