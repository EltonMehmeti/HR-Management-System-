import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Layouts/Dashboard/pages/Dashboard';
import './index.css';

import EmpSignin from './components/auth/Employee/Signin';
import EmployeeList from './Layouts/Dashboard/components/Employee/EmployeeList';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';

import HrSignin from './components/auth/HR/Signin';
import HrSignup from './components/auth/HR/Signup';
import { UserProvider } from './helper/UserContext';
import RequireAuth from './helper/RequireAuth';
import EmployeeDetails from './Layouts/Dashboard/components/Employee/EmployeeDetails';
import Interviews from './Layouts/Dashboard/components/Interview/Interviews';
import Team from "./Layouts/Dashboard/components/Team/Team"
import Calendar from "./Layouts/Dashboard/components/Calendar"
import Job from './Layouts/Dashboard/components/Job/Job';
import SuperAdminSignin from './components/auth/SuperAdmin/SuperAdminSignin';
import JobApplicantList from './Layouts/Dashboard/pages/JobApplicantList';
import HRList from './Layouts/Dashboard/components/SuperAdmin/HR/HRList';
import OrgChart from './Layouts/Dashboard/components/Org/OrgChart';
function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/employee/signin" element={<EmpSignin />} />
          <Route path="/admin/signin" element={<SuperAdminSignin />} />
          <Route path="/superadmin/signin" element={<SuperAdminSignin />} />
          <Route path="/hr/signin" element={<HrSignin />} />
          <Route path="/hr/signup" element={<HrSignup />} />

          <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
          <Route element={<RequireAuth allowedRole={"data_manager"} />}>
              <Route path="/teams" element={<Team />} />
              <Route path="employee" element={<EmployeeList />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Route>
          <Route element={<RequireAuth allowedRole={"admin"} />}>
              <Route path="/hr-list" element={<HRList />} />
          </Route>
            <Route element={<RequireAuth allowedRole={"recruiter"} />}>
              <Route path="jobApplicant" element={<JobApplicantList  />} />
              <Route path="/recruit" element={<Interviews />} />

              <Route path="/jobschema" element={<Job />}></Route>
            <Route path="calendar" element={<Calendar />} />
            </Route>
            <Route element={<RequireAuth allowedRole={"employee"} />}>
              <Route path="org" element={<OrgChart />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
