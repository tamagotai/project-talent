import RequireAuth from './utils/RoleAuthRoute';
import RoleAuthRoute from './utils/RoleAuthRoute';
import AuthRoute from './utils/AuthRoute';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorised from './pages/Unauthorised';
import Dashboard from './pages/Dashboard';
import Rate from './pages/Rate';
import Projects from './pages/Projects';
import Talents from './pages/Talents/Talents';
import Vacancies from './pages/Vacancies';
import Users from './pages/Users/Users';
import UserDetails from './pages/Users/UserDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notification from './pages/Notfication';
import NotFound from './pages/NotFound';

//components
import Loading from './components/Loading';

//layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { PublicLayout } from './layouts/PublicLayout';




const ROLES = {
  'Admin': 1,
  'Talent': 2,
  'Organiser': 3,
}

function App() {
  const { isLoading } = useAuth();

  return (
    <div className="app">      
      <div className="content">
        <Routes>
          {/* PUBLIC ROUTES  */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/unauthorised" element={<Unauthorised />}/>
          </Route>
          {/* PRIVATE ROUTES */}
          
          <Route element={isLoading ? <Loading /> : <AuthRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/dashboard/rate" element={<Rate />} />
              <Route path="/dashboard/projects" element={<Projects />} />
              <Route path="/dashboard/talents" element={<Talents />} />
              <Route path="/dashboard/vacancies" element={<Vacancies />} />
              <Route path="/dashboard/users" element={<RoleAuthRoute allowedRoles={[ROLES.Admin]}><Users /></RoleAuthRoute>} />
              <Route path="/dashboard/users/:id" element={<RoleAuthRoute allowedRoles={[ROLES.Admin]}><UserDetails /></RoleAuthRoute>} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/notifications" element={<Notification />} />
              <Route path="/dashboard/unauthorised" element={<Unauthorised />}/>
            </Route>
          </Route>
          
          {/* NOT FOUND ROUTE */}
          <Route path="*" element={<NotFound />}/>
        </Routes> 
      </div> 
    </div>
  );
}

export default App;
