import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import TutorApproval from './TutorApproval';
import DashboardHome from './Dashboardhome';
import ParentProfile from './ParentProfile';
// import Settings from './Settings';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[220px] overflow-y-auto"> {/* Adjust for the sidebar width */}
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile-approval" element={<TutorApproval />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path='/parent/profile' element={<ParentProfile/>}/>
        </Routes>
      </div>
    </div>
  );
}
