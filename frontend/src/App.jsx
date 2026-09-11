import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import ApplyModal from './components/common/ApplyModal.jsx';
import RoleRoute from './components/common/RoleRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Companies from './pages/Companies.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Pricing from './pages/Pricing.jsx';
import Resources from './pages/Resources.jsx';

// Toast Notification component
const ToastNotification = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const bgColors = {
    success: 'bg-slate-900 dark:bg-slate-800 text-white border-slate-800 dark:border-slate-700 shadow-2xl',
    danger: 'bg-rose-600 text-white border-rose-700 shadow-2xl',
    info: 'bg-indigo-600 text-white border-indigo-700 shadow-2xl',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`px-5 py-3.5 rounded-2xl text-xs font-bold border flex items-center gap-2.5 ${
          bgColors[toast.type] || bgColors.success
        }`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 selection:dark:bg-indigo-950 selection:dark:text-indigo-200 transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/resources" element={<Resources />} />

                {/* Job Seeker Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <RoleRoute allowedRoles={['jobseeker']}>
                      <Dashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/saved-jobs"
                  element={
                    <RoleRoute allowedRoles={['jobseeker']}>
                      <Dashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/applications"
                  element={
                    <RoleRoute allowedRoles={['jobseeker']}>
                      <Dashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RoleRoute allowedRoles={['jobseeker']}>
                      <Profile />
                    </RoleRoute>
                  }
                />

                {/* Employer Protected Route */}
                <Route
                  path="/employer/dashboard"
                  element={
                    <RoleRoute allowedRoles={['employer', 'admin']}>
                      <EmployerDashboard />
                    </RoleRoute>
                  }
                />

                {/* Admin Protected Route */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <RoleRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </RoleRoute>
                  }
                />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />

            {/* Global Modals & Notifications */}
            <ApplyModal />
            <ToastNotification />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
