import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import OpportunityDetails from './pages/OpportunityDetails/OpportunityDetails';
import Profile from './pages/Profile/Profile';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AddOpportunity from './pages/AddOpportunity/AddOpportunity';
import EditOpportunity from './pages/EditOpportunity/EditOpportunity';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/opportunity/:id" element={<OpportunityDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Student-protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="student">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute role="student">
                <Bookmarks />
              </ProtectedRoute>
            }
          />

          {/* Admin-protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-opportunity"
            element={
              <ProtectedRoute role="admin">
                <AddOpportunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-opportunity/:id"
            element={
              <ProtectedRoute role="admin">
                <EditOpportunity />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
