import './App.css';
import {Route, Routes } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Defaultlayout from './components/layouts/Defaultlayout';
import Authe from './components/pages/Auth';
import Notfound from './components/pages/Notfound';
import Userlayout from './components/layouts/Userlayout';
import Profileuser from './components/pages/Profileuser';
import { HashRouter } from 'react-router-dom';
function App() {
  
  return (
    <HashRouter>
    {/* // <BrowserRouter> */}
      <Routes>
          <Route path='/' element={
            <Defaultlayout>
              <Homepage />
            </Defaultlayout>
          } />
          <Route path='/login' element={
            <Authe />
          } />
        <Route path='/user/:id' element=
          {
            <Defaultlayout>
              <Homepage />
            </Defaultlayout>
          } />

        <Route path='/profile/:id' element=
          {
            <Userlayout>
              <Profileuser />
            </Userlayout>
          } />
        <Route path='*' element={<Notfound />} />
      </Routes>
    {/* </BrowserRouter>  */}
    </HashRouter>
  );
}

export default App;
