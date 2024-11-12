import '@/App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import PublicRouter from '@/pages/Public/PublicRouter';
import AdminRouter from '@/pages/Admin/AdminRouter';
import AuthRouter from '@/pages/Auth/AuthRouter';
import AuthGuard from '@/_helpers/AuthGuard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path='/*' element={<PublicRouter />} />

          {/* Routes d'administration protégées, accessibles uniquement aux administrateurs */}
          <Route 
            path='/admin/*' 
            element={
              <AuthGuard adminOnly={true}> {/* Indique que cette route est réservée aux administrateurs */}
                <AdminRouter />
              </AuthGuard>
            } 
          />

          {/* Routes d'authentification */}
          <Route path='/auth/*' element={<AuthRouter />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
