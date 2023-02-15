
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './features/auth/welcome/Welcome';
import Login from './features/auth/login/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
    <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
