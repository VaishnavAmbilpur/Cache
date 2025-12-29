
import './App.css'
import MainPages from './Pages/MainPages'
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import UserContext from "./Global"
import { useState } from 'react';
import Create from './Pages/Create';
import Login from './Componets/Login';
import Singup from './Componets/Singup';
function App() {
  const [login,setlogin] = useState(false);
  const [token, setToken] = useState("");
  return (
    <>
      <UserContext.Provider value={{login,setlogin, token, setToken}}>
        <BrowserRouter>
     <Routes>
    
        <Route path="/" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <MainPages title='Notes'/>
         </div>
       } />
       <Route path="/twitter" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <MainPages title='Twitter'/>
         </div>
       } /><Route path="/Videos" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <MainPages title='Videos'/>
         </div>
       } /><Route path="/Links" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <MainPages title='Links'/>
         </div>
       } /><Route path="/Tags" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <MainPages title='Tags'/>
         </div>
       } />
      
       <Route path="/create" element={
         <div className='min-h-screen min-w-screen flex-col'>
           <Create/>
         </div>
       } />
       <Route path="/login" element={
         <div className='h-screen w-full bg-black text-white flex justify-center items-center'>
           <Login/>
         </div>
       } />
       <Route path="/signup" element={
         <div className='h-screen w-full bg-black text-white flex justify-center items-center'>
           <Singup/>
         </div>
       } />
     </Routes>
    </BrowserRouter>
     </UserContext.Provider>
    </>
  )
}

export default App