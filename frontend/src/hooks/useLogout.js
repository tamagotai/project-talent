const useLogout = () => {
    const logout = (onLoggedOut) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      onLoggedOut();
    };
  
    return logout;
  };
  
  export default useLogout;