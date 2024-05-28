import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './pages/navbar'; 
import Index from './pages/index';
import About from './pages/about';
import Services from './pages/services';
import Form from './pages/form';
import Contact from './pages/contact';
import Sidebar from './pages/Sidebar'; 
import Footer from './pages/footer';
import PageList from './pages/FormListPage';
import ViewForm from './pages/view';
import EditForm from './pages/edit';
import FormViewer from './pages/formview';
import Register from './pages/register';
import Login from './pages/login';
import Google from './pages/google';
import Responcelist from './pages/responcelist';
import ViewRes from './pages/viewresp';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/form" element={<Form />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/list" element={< PageList/>} />
          <Route path="/view/:id" element={< ViewForm/> }/>
          <Route path="/update/:id" element={< EditForm/> }/>
          <Route path="/viewform/:id" element={<FormViewer />} />
          <Route path="/register" element={< Register/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/google" element={< Google/>} />
          <Route path="/reslist" element={< Responcelist/>} />
          <Route path="/response/:id" element={<ViewRes />} />

        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
