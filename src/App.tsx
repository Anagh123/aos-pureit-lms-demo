import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Scenarios } from './pages/Scenarios';
import { Simulator } from './pages/Simulator';
import { Feedback } from './pages/Feedback';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { Leaderboard } from './pages/Leaderboard';
import { Reports } from './pages/Reports';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
