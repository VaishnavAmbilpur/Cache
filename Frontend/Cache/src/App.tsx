
import './App.css'
import MainPages from './Pages/MainPages'
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import UserContext from "./Global"
import { useState } from 'react';
import Create from './Pages/Create';
function App() {
  const [login,setlogin] = useState(localStorage.getItem("token"));
  return (
    <>
      <UserContext.Provider value={{login,setlogin}}>
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
     </Routes>
    </BrowserRouter>
     </UserContext.Provider>
    </>
  )
}

export default App