import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import MembershipPage from "@/components/pages/MembershipPage";
import MasterPage from "@/components/pages/MasterPage";
import InsightsPage from "@/components/pages/InsightsPage";
import VideoPlayerPage from "@/components/pages/VideoPlayerPage";
import BlogPostPage from "@/components/pages/BlogPostPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="membership" element={<MembershipPage />} />
            <Route path="membership/:courseId" element={<VideoPlayerPage />} />
            <Route path="master" element={<MasterPage />} />
            <Route path="master/:courseId" element={<VideoPlayerPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="insights/:postId" element={<BlogPostPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;