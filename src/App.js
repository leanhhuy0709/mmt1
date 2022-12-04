
import A from './A.js';
import B from './B.js';
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './page/Login/Login';
import Register from './page/Register/Register';
function App() {
    if (!localStorage.getItem('usr'))
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = '/login' element = {<Login/>}/>
                    <Route path = '/register' element = {<Register/>}/>
                    <Route path = '/' element = {<Login/>}/>
                </Routes>
            </BrowserRouter>
        );
    else
    return (
    <BrowserRouter>
        <Routes>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/register' element = {<Register/>}/>
            <Route path = '/' element = {<A/>}/>
        </Routes>
    </BrowserRouter>
);
}


export default App;