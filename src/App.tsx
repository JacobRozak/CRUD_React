import React from 'react';
import './App.css';
import Products from "./admin/Products";
import {BrowserRouter, Route} from "react-router-dom";

import ProductsCreate from "./admin/ProductsCreate";
import ProductsEdit from "./admin/ProductsEdit";
import Events from "./admin/Events"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path='/' exact component={Products}/>
                <Route path='/create' exact component={ProductsCreate}/>
                <Route path='/edit/:id' exact component={ProductsEdit}/>
                <Route path='/event/:id' exact component={Events}/>
            </BrowserRouter>

        </div>
    );
}

export default App;
