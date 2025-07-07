import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegister from "pages/login-register";
import StudentDashboard from "pages/student-dashboard";
import CourseCatalog from "pages/course-catalog";
import InstructorDashboard from "pages/instructor-dashboard";
import VideoPlayer from "pages/video-player";
import CourseDetail from "pages/course-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CourseCatalog />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/course-catalog" element={<CourseCatalog />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/course-detail" element={<CourseDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;