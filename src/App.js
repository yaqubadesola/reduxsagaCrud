
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import About from './pages/About';
import ViewUser from './pages/ViewUser';
import Header from './components/Header';


import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
        <Header/>
        <BrowserRouter>
        <ToastContainer/>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/addedit" element={<AddEdit />} />
              <Route exact path="/addedit/:id" element={<AddEdit />} />
              <Route exact path="/viewuser" element={<ViewUser />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
