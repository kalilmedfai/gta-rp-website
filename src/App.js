// import logo from './logo.svg';
import '@/App.css';

import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import Boutique from '@/pages/Boutique';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from '@/_utils/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>

          <Route path="/accueil" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/boutique" element={<Boutique/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
