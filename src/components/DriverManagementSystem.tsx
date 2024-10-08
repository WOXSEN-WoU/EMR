'use client';  // Add this line at the top of the file

import React, { useState, useEffect } from 'react';

// Utility function for className merging
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Enhanced Shadcn UI components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'success';
  size?: 'default' | 'sm' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant = 'default', size = 'default', ...props }) => (
  <button
    className={cn(
      "px-4 py-2 rounded-md font-bold text-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2",
      variant === 'default' && "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      variant === 'outline' && "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-100 focus:ring-green-500",
      variant === 'success' && "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      size === 'sm' && "text-sm px-3 py-1",
      size === 'lg' && "text-xl px-6 py-3",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={cn(
      "px-4 py-3 bg-white border-2 border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-500",
      className
    )}
    {...props}
  />
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("bg-white shadow-lg rounded-lg border-2 border-gray-200", className)}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("px-6 py-5 border-b-2 border-gray-200 bg-gray-50", className)}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("px-6 py-5", className)}>
    {children}
  </div>
);

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className }) => (
  <div className={cn("w-24 h-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border-4 border-green-500", className)}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-green-600 font-bold text-3xl">{fallback}</span>
    )}
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'destructive' | 'warning' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => (
  <span className={cn(
    "px-3 py-1 rounded-full text-sm font-bold",
    variant === 'success' && "bg-green-100 text-green-800 border-2 border-green-500",
    variant === 'destructive' && "bg-red-100 text-red-800 border-2 border-red-500",
    variant === 'warning' && "bg-yellow-100 text-yellow-800 border-2 border-yellow-500",
    variant === 'info' && "bg-green-100 text-green-800 border-2 border-green-500"
  )}>
    {children}
  </span>
);

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
    <div 
      className="bg-green-600 h-full rounded-full transition-all duration-500 ease-in-out" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Toast component for notifications
interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => (
  <div className={cn(
    "fixed bottom-4 right-4 px-6 py-4 rounded-md shadow-lg text-white font-bold animate-fade-in-up",
    type === 'info' && "bg-green-600",
    type === 'success' && "bg-green-600",
    type === 'error' && "bg-red-600"
  )}>
    {message}
    <button onClick={onClose} className="ml-4 text-white">&times;</button>
  </div>
);

// Authentication Modal Component
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title: string;
  message: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4"
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={() => onConfirm(password)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

const DriverManagementSystem: React.FC = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  useEffect(() => {
    // Fetch drivers or perform any initial setup
  }, []);

  const showToast = (message: string, type: 'info' | 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuthConfirm = (password: string) => {
    // Implement your authentication logic here
    console.log('Authentication confirmed with password:', password);
    setIsAuthModalOpen(false);
    showToast('Authentication successful', 'success');
  };

  return (
    <div>
      <h1 className={cn('text-2xl', 'font-bold', 'mb-4')}>Driver Management System</h1>
      <Card>
        <CardHeader>
          <h2>Driver Information</h2>
        </CardHeader>
        <CardContent>
          <Avatar src="/path-to-image.jpg" alt="Driver" fallback="JD" />
          <Input placeholder="Driver Name" />
          <Button onClick={() => setIsAuthModalOpen(true)}>Authenticate</Button>
          <Badge variant="success">Active</Badge>
          <Progress value={75} />
        </CardContent>
      </Card>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onConfirm={handleAuthConfirm}
        title="Authentication Required"
        message="Please enter your admin password to continue."
      />
    </div>
  );
};

export default DriverManagementSystem;

// Export all the components individually
export { Card, CardHeader, CardContent, Button, Input, Avatar, Badge, Progress, Toast, AuthModal };