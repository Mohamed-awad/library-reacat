import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";

import Nav from "./components/sharecompo/Nav";
import NavAdmin from "./components/sharecompo/NavAdmin";
import Footer from "./components/sharecompo/Footer";

import Books from "./components/booksComponents/books";
import BookProfile from "./components/booksComponents/bookprofil";


import UsrLogin from "./components/userComponents/UsrLogin";
import UsrSignUp from "./components/userComponents/UsrSignUp";
import UserPage from "./components/userComponents/userPage";
import AdminControl from "./components/adminPanal/AdminControl";


import FavorietBooks from './components/booksComponents/favoriet'


class App extends React.Component {

    render() {

        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path='/' exact component={UsrLogin}/>
                    <Route path='/' exact component={UsrSignUp}/>
                    <Route path='/' exact component={Footer}/>

                    <Route path='/user/:id' exact component={Nav}/>
                    <Route path='/user/:id' exact component={UserPage}/>
                    <Route path='/user/:id' exact component={Footer}/>


                    <Route path='/books' exact component={Nav}/>
                    <Route path='/books' exact component={Books}/>
                    <Route path='/books' exact component={Footer}/>

                    <Route path='/books/:id' exact component={Nav}/>
                    <Route path='/books/:id' exact component={BookProfile}/>
                    <Route path='/books/:id' exact component={Footer}/>

                    <Route path='/favourite/' exact component={Nav}/>
                    <Route path='/favourite/' exact component={FavorietBooks}/>
                    <Route path='/favourite/' exact component={Footer}/>

                    {/*<Route path='/AdminControl' exact component={NavAdmin}/>*/}
                    <Route path="/AdminControl" exact component={AdminControl}/>
                    {/*<Route path='/AdminControl' exact component={Footer}/>*/}

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
