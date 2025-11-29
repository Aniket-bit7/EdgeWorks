import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";

import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProRoute from "./ProRoute";   // ⭐ NEW

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />

        {/* PROTECTED AI DASHBOARD */}
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />

          {/* ⭐ PRO-ONLY PAGES */}
          <Route
            path="generate-images"
            element={
              <ProRoute>
                <GenerateImages />
              </ProRoute>
            }
          />

          <Route
            path="remove-background"
            element={
              <ProRoute>
                <RemoveBackground />
              </ProRoute>
            }
          />

          <Route
            path="remove-object"
            element={
              <ProRoute>
                <RemoveObject />
              </ProRoute>
            }
          />

          <Route
            path="review-resume"
            element={
              <ProRoute>
                <ReviewResume />
              </ProRoute>
            }
          />

          {/* FREE PAGE */}
          <Route path="community" element={<Community />} />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
};

export default App;
