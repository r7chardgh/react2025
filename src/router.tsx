import App from "./App";
import AboutPage from "./pages/about"
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router