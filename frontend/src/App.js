import RequireAuth from './utils/RequireAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorised from './pages/Unauthorised';
import Dashboard from './pages/Dashboard';
import Search from './pages/Profile';
import Rate from './pages/Rate';
import Talents from './pages/Talents';
import Vacancies from './pages/Vacancies';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

//components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


const ROLES = {
  'Admin': 1,
  'Talent': 2,
  'Organiser': 3,
}

function App() {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated && <Sidebar />}
      <main className="content">
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES  */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/unauthorised" element={<Unauthorised />}/>
          
        {/* PRIVATE ROUTES */}
          <Route element={isLoading ? null : isAuthenticated ? <RequireAuth allowedRoles={Object.values(ROLES)}/> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/talents" element={<Talents />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/users" element={<RequireAuth allowedRoles={[ROLES.Admin]}><Users /></RequireAuth>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        {/* NOT FOUND ROUTE */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
