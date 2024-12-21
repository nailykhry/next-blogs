'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const notificationStyles = {
  success: 'bg-green-500 text-white',
  danger: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};


const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const showNotification = useCallback((message, type = 'success') => {
    const id = new Date().getTime(); 
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, type },
    ]);

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    }, 5000);
  }, []);
  
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <div className="fixed z-50 transform -translate-x-1/2 top-4 left-1/2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 mb-2 rounded-md shadow-md w-96 ${notificationStyles[notification.type]}`}
          >
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
