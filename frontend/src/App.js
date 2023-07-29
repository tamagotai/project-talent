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
import Chat from './pages/Chat';
import Talents from './pages/Talents';
import Vacancies from './pages/Vacancies';
import Users from './pages/Users';
import Profile from './pages/Profile';

//components
import Navbar from './components/Navbar';
import CustomSidebar from './components/Sidebar';


// const ROLES = {
//   'User': XXX,
//   'Admin': XXX,
//   'Talent': XXX,
//   'Organiser': xxx
// }

function App() {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <div className="app">
      {isAuthenticated && <CustomSidebar />}
      <main className="content">
      <Navbar />
        <Routes>
          {/* PUBLIC ROUTES  */}
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/unauthorised" element={<Unauthorised />}/>
          {/* PRIVATE ROUTES */}
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={isLoading ? null : isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>
            <Route path="/search" element={isLoading ? null : isAuthenticated ? <Search /> : <Navigate to="/login" />}/>
            <Route path="/chat" element={isLoading ? null : isAuthenticated ? <Chat /> : <Navigate to="/login" />}/>
            <Route path="/talents" element={isLoading ? null : isAuthenticated ? <Talents /> : <Navigate to="/login" />}/>
            <Route path="/vacancies" element={isLoading ? null : isAuthenticated ? <Vacancies /> : <Navigate to="/login" />}/>
            <Route path="/users" element={isLoading ? null : isAuthenticated ? <Users /> : <Navigate to="/login" />}/>
            <Route path="/profile" element={isLoading ? null : isAuthenticated ? <Profile /> : <Navigate to="/login" />}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
