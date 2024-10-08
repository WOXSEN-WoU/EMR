"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Utility function for className merging
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Define types for our components
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'success' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

// Enhanced Shadcn UI components
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className, 
  variant = 'default', 
  size = 'default' 
}) => (
  <button
    className={cn(
      "px-4 py-2 rounded-md font-bold text-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2",
      ((variant === 'default' || variant === 'success') && "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500") || "",
      (variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500") || "",
      (variant === 'outline' && "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-100 focus:ring-green-500") || "",
      size === 'sm' ? "text-sm px-3 py-1" : "",
      size === 'lg' ? "text-xl px-6 py-3" : "",
      className || ""
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={cn(
      "px-4 py-3 bg-white border-2 border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-500",
      className || ""
    )}
    {...props}
  />
);

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("bg-white shadow-lg rounded-lg border-2 border-gray-200", className || "")}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("px-6 py-5 border-b-2 border-gray-200 bg-gray-50", className || "")}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("px-6 py-5", className || "")}>
    {children}
  </div>
);

// Define types for our data
type Driver = {
  id: number;
  name: string;
  company: string;
  licenseNumber: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  address: string;
  hireDate: string;
  performanceRating: number;
  profilePhoto: string;
};

type CarBreakdowns = {
  [key: number]: boolean;
};

type Remarks = {
  [key: number]: Array<{ text: string; date: string }>;
};

// Toast component
const Toast: React.FC<{ message: string; type: string; onClose: () => void }> = ({ message, type, onClose }) => (
  <div className={`fixed bottom-4 right-4 p-4 rounded-md ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
    {message}
    <button onClick={onClose} className="ml-4">×</button>
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('login');
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [carBreakdowns, setCarBreakdowns] = useState<CarBreakdowns>({});
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [remarks, setRemarks] = useState<Remarks>({});

  useEffect(() => {
    // Initialize drivers with some data
    const initialDrivers: Driver[] = Array(50).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Driver ${index + 1}`,
      company: ['Alpha Logistics', 'Beta Transport', 'Gamma Shipping', 'Delta Freight'][Math.floor(Math.random() * 4)],
      licenseNumber: `DL${100000 + index}`,
      status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)] as 'Active' | 'Inactive',
      email: `driver${index + 1}@example.com`,
      phone: `+1 (555) ${100 + index}-${1000 + index}`,
      address: '123 Main St, Anytown, USA',
      hireDate: '2022-01-01',
      performanceRating: Number((Math.random() * 2 + 3).toFixed(1)),
      profilePhoto: `/placeholder-avatar-${index % 5 + 1}.jpg`,
    }));
    setDrivers(initialDrivers);
  }, []);

  const showToast = (message: string, type: string = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Example usage of components to avoid unused variable warnings
  return (
    <div className="app-container min-h-screen bg-white">
      <Card>
        <CardHeader>
          <h1>Driver Management System</h1>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search drivers" />
          <Button onClick={() => showToast('Button clicked', 'info')}>
            Click me
          </Button>
          {drivers.length > 0 && (
            <p>Total drivers: {drivers.length}</p>
          )}
          {Object.keys(carBreakdowns).length > 0 && (
            <p>Cars with breakdowns: {Object.keys(carBreakdowns).length}</p>
          )}
          {Object.keys(remarks).length > 0 && (
            <p>Drivers with remarks: {Object.keys(remarks).length}</p>
          )}
        </CardContent>
      </Card>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default App;