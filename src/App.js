import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MoviePopup from './components/MoviePopup';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <MoviePopup />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
