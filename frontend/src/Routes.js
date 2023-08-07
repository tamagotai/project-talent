import RequireAuth from './utils/RoleAuthRoute';
import Sidebar from './components/Sidebar';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorised from './pages/Unauthorised';
import Dashboard from './pages/Dashboard';
import Rate from './pages/Rate';
import Talents from './pages/Talents';
import Vacancies from './pages/Vacancies';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const ROLES = {
    'Admin': 1,
    'Talent': 2,
    'Organiser': 3,
  }

export const routes = [
  {
    path: "/",
    main: () => <Home />,
    sidebar: () => null,
  },
  {
    path: "/login",
    main: () => <Login />,
    sidebar: () => null,
  },
  {
    path: "/signup",
    main: () => <Signup />,
    sidebar: () => null,
  },
  {
    path: "/unauthorised",
    main: () => <Unauthorised />,
    sidebar: () => null,
  },
  {
    path: "/dashboard",
    main: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Dashboard /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "/rate",
    main: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Rate /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "/talents",
    main: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Talents /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "/vacancies",
    main: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Vacancies /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "/users",
    main: () => <RequireAuth allowedRoles={[ROLES.Admin]}><Users /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "/profile",
    main: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Profile /></RequireAuth>,
    sidebar: () => <Sidebar />,
  },
  {
    path: "*",
    main: () => <NotFound />,
    sidebar: () => <RequireAuth allowedRoles={Object.values(ROLES)}><Sidebar /></RequireAuth>,
  },
]