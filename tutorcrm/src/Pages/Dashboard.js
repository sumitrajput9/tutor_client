import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import TutorApproval from './TutorApproval';
import DashboardHome from './Dashboardhome';
import ParentProfile from './ParentProfile';
import { NotificationTemplate } from './Notifications/NotificationPage';
import { NotificationTemplates } from './Notifications/NotificationTemplates';
import {  ClientNotificationPages } from './ClientNotifications/ClientNotificationPage';
import { ClientNotificationTemplate } from './ClientNotifications/ClientNotificationTemplate';
import { TutorPayout } from './Payout/TutorPayout';
import { TutorLoginAs } from './Loginas/TutorLoginAs';
import { ClientLoginAs } from './Loginas/ClientLoginAs';
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
          <Route path='/notifications' element={<NotificationTemplate />} />
          <Route path='/notification/template' element={<NotificationTemplates />} />
          <Route path='/client/notifications' element={<ClientNotificationPages />} />
          <Route path='/client/notification/template' element={<ClientNotificationTemplate />} />
          <Route path='/tutor/payout' element={<TutorPayout/>} /> 
          <Route path='/tutor/login-as' element={<TutorLoginAs />} />
          <Route path='/client/login-as' element={<ClientLoginAs/>}/>

        </Routes>
      </div>
    </div>
  );
}
