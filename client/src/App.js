import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';

import EmpSignin from './components/auth/employee/Signin';

import EmployeeList from './Layouts/Dashboard/components/Employee/EmployeeList';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import JobApplicantList from './Layouts/Dashboard/pages/JobApplicantList';
import HrSignin from './components/auth/hr/Signin';
import HrSignup from './components/auth/hr/Signup';
import { UserProvider } from './helper/UserContext';
import RequireAuth from './helper/RequireAuth';


function App() {
  return (
    <Router>
      <UserProvider> 
        <Routes>
          <Route path="/employee/signin" element={<EmpSignin />} />

          <Route path="/hr/signin" element={<HrSignin />} />
          <Route path="/hr/signup" element={<HrSignup />} />

          {/* DashboardLayout will contain nested routes */}
          <Route path="/" element={<DashboardLayout />}>
          <Route element={<RequireAuth />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<EmployeeList />} />
            <Route path="jobApplicant" element={<JobApplicantList />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
