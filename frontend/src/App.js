import { Routes, Route, Navigate } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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



function App() {
  const user = false;
  return (
    <div className="app">
      <CustomSidebar />
      <main className="content">
      <Navbar user={user}/>
        <Routes>          
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}/>
          <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />}/>
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />}/>
          <Route path="/talents" element={user ? <Talents /> : <Navigate to="/login" />}/>
          <Route path="/vacancies" element={user ? <Vacancies /> : <Navigate to="/login" />}/>
          <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />}/>
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
