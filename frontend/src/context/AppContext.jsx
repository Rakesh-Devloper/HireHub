import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: default to dark or saved preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('hirehub_theme');
      if (saved === 'dark' || saved === 'light') return saved === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('hirehub_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('hirehub_theme', 'light');
      }
    } catch (e) {
      console.error('Theme switch error:', e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Interview Scheduled',
      message: 'Google has scheduled your technical interview for Senior Frontend Developer.',
      time: '10m ago',
      read: false,
    },
    {
      id: 2,
      title: 'Job Offer Received! 🎉',
      message: 'Congratulations! Microsoft has extended an official job offer.',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      title: 'New Matching Job',
      message: 'Amazon posted Full Stack Engineer matching your skills.',
      time: '3h ago',
      read: true,
    },
  ]);

  const [activeApplicationModalJob, setActiveApplicationModalJob] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const openApplyModal = (job) => {
    setActiveApplicationModalJob(job);
  };

  const closeApplyModal = () => {
    setActiveApplicationModalJob(null);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markAllNotificationsRead,
        activeApplicationModalJob,
        openApplyModal,
        closeApplyModal,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
