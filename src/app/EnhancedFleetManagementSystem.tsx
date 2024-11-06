"use client";

import React, { useState } from 'react'
import Image from 'next/image' // Import Image from next/image

// Mock user data - in a real application, this would come from an API
const mockUserData = {
  name: "John Doe",
  age: 35,
  bloodType: "A+",
  height: "180 cm",
  weight: "75 kg",
  medicalConditions: ["Type 2 Diabetes", "Hypertension"],
  medications: [
    { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "once daily" }
  ],
  recentTests: [
    { name: "HbA1c", value: "7.1%", date: "2023-05-15", status: "Attention" },
    { name: "Cholesterol", value: "180 mg/dL", date: "2023-05-15", status: "Good" },
    { name: "Vitamin D", value: "32 ng/mL", date: "2023-05-15", status: "Good" },
  ],
  scans: [
    { type: "X-Ray", date: "2023-05-01", description: "Chest X-Ray", imageUrl: "https://example.com/chest-xray.jpg" },
    { type: "MRI", date: "2023-04-15", description: "Brain MRI", imageUrl: "https://example.com/brain-mri.jpg" }
  ],
  appointments: [
    { date: "2023-06-15", time: "10:00 AM", doctor: "Dr. Smith", specialty: "Cardiology" },
    { date: "2023-07-01", time: "2:00 PM", doctor: "Dr. Johnson", specialty: "Endocrinology" }
  ]
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#3498db',
    borderRadius: '8px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    margin: 0,
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  main: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  tabContainer: {
    display: 'flex',
    marginBottom: '20px',
    borderBottom: '2px solid #3498db',
  },
  tab: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    transition: 'all 0.3s',
  },
  activeTab: {
    borderBottom: '2px solid #3498db',
    color: '#3498db',
  },
  content: {
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#3498db',
  },
  cardContent: {
    fontSize: '16px',
    fontWeight: '500',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  loginForm: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  scanImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as React.CSSProperties['objectFit'],
    borderRadius: '4px',
    marginBottom: '10px',
  },
}

export default function HealthWallet() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('vitals');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', email, password)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginForm}>
          <h2 style={styles.title}>Health Wallet Login</h2>
          <p style={{marginBottom: '20px', color: '#666'}}>Enter your credentials to access your health data</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Health Wallet</h1>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </header>
      <main style={styles.main}>
        <h2 style={{marginBottom: '10px', fontSize: '24px'}}>Welcome, {mockUserData.name}</h2>
        <p style={{marginBottom: '20px', color: '#666', fontSize: '18px'}}>Age: {mockUserData.age}, Blood Type: {mockUserData.bloodType}</p>
        <div style={styles.tabContainer}>
          <button 
            onClick={() => setActiveTab('vitals')} 
            style={{...styles.tab, ...(activeTab === 'vitals' ? styles.activeTab : {})}}
          >
            Vitals
          </button>
          <button 
            onClick={() => setActiveTab('medications')} 
            style={{...styles.tab, ...(activeTab === 'medications' ? styles.activeTab : {})}}
          >
            Medications
          </button>
          <button 
            onClick={() => setActiveTab('tests')} 
            style={{...styles.tab, ...(activeTab === 'tests' ? styles.activeTab : {})}}
          >
            Recent Tests
          </button>
          <button 
            onClick={() => setActiveTab('scans')} 
            style={{...styles.tab, ...(activeTab === 'scans' ? styles.activeTab : {})}}
          >
            Scans
          </button>
          <button 
            onClick={() => setActiveTab('appointments')} 
            style={{...styles.tab, ...(activeTab === 'appointments' ? styles.activeTab : {})}}
          >
            Appointments
          </button>
        </div>
        <div style={styles.content}>
          {activeTab === 'vitals' && (
            <div style={styles.grid}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Height</h3>
                <p style={styles.cardContent}>{mockUserData.height}</p>
              </div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Weight</h3>
                <p style={styles.cardContent}>{mockUserData.weight}</p>
              </div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Medical Conditions</h3>
                <ul style={styles.list}>
                  {mockUserData.medicalConditions.map((condition, index) => (
                    <li key={index} style={styles.cardContent}>{condition}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'medications' && (
            <div style={styles.grid}>
              {mockUserData.medications.map((medication, index) => (
                <div key={index} style={styles.card}>
                  <h3 style={styles.cardTitle}>{medication.name}</h3>
                  <p style={styles.cardContent}>{medication.dosage}, {medication.frequency}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'tests' && (
            <div style={styles.grid}>
              {mockUserData.recentTests.map((test, index) => (
                <div key={index} style={styles.card}>
                  <h3 style={styles.cardTitle}>{test.name}</h3>
                  <p style={styles.cardContent}>
                    Result: {test.value}<br />
                    Date: {test.date}<br />
                    Status: <span style={{color: test.status === 'Good' ? 'green' : 'orange'}}>{test.status}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'scans' && (
            <div style={styles.grid}>
              {mockUserData.scans.map((scan, index) => (
                <div key={index} style={styles.card}>
                  <Image src={scan.imageUrl} alt={scan.description} width={500} height={150} style={styles.scanImage} />
                  <h3 style={styles.cardTitle}>{scan.type}</h3>
                  <p style={styles.cardContent}>
                    Date: {scan.date}<br />
                    Description: {scan.description}
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'appointments' && (
            <div style={styles.grid}>
              {mockUserData.appointments.map((appointment, index) => (
                <div key={index} style={styles.card}>
                  <h3 style={styles.cardTitle}>{appointment.doctor}</h3>
                  <p style={styles.cardContent}>
                    Specialty: {appointment.specialty}<br />
                    Date: {appointment.date}<br />
                    Time: {appointment.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}