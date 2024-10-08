'use client';  // Add this line at the top of the file

import React, { useState } from 'react';
import Image from 'next/image';

// Remove empty interface or add properties
// interface Props {}

const DriverManagementSystem: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]); // Specify Driver type instead of any

  // Rest of your component logic

  return (
    <div>
      {/* Replace <img> with <Image> */}
      <Image src="/path-to-image.jpg" alt="Description" width={500} height={300} />
      
      {/* Use the drivers state */}
      {drivers.map(driver => (
        <div key={driver.id}>{driver.name}</div>
      ))}
    </div>
  );
};

export default DriverManagementSystem;