// // import logo from './logo.svg';
import '@/App.css';

import { Routes, BrowserRouter, Route } from 'react-router-dom'
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
          {/* '*' permet de dire qu'il y a de l'enfant derrière sinon erreur */}
          <Route path='/*' element={<PublicRouter/>}/>
          <Route path='/admin/*' element={
            <AuthGuard>
              <AdminRouter/>
            </AuthGuard> 
          }/>
          <Route path='/auth/*' element={<AuthRouter/>}/>
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import '@/App.css';

// import { Routes, BrowserRouter, Route } from 'react-router-dom';
// import PublicRouter from '@/pages/Public/PublicRouter';
// import AdminRouter from '@/pages/Admin/AdminRouter';
// import AuthRouter from '@/pages/Auth/AuthRouter';
// import AuthGuard from '@/_helpers/AuthGuard';
// import UserLogin from '@/pages/Auth/UserLogin';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Routes publiques */}
//           <Route path='/*' element={<PublicRouter />} />

//           {/* Routes administratives, protégées pour les administrateurs */}
//           <Route path='/admin/*' element={
//             <AuthGuard allowedRoles={['admin']}>
//               <AdminRouter />
//             </AuthGuard>
//           }/>

//           {/* Routes d'authentification */}
//           <Route path='/auth/*' element={<AuthRouter />} />

//           {/* Routes de connexion utilisateur */}
//           <Route path='/login/*' element={<UserLogin />} />

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
