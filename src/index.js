import React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/login";
import Edit from "./routes/edit";
import EditRaw from "./routes/editRaw";
import Show from "./routes/show";
import Main from "./routes/main";
import ProtectedLayout from "./components/ProtectedLayout"
import HomeLayout from "./components/HomeLayout"
import { Provider } from "react-redux";
import store from "./store";

/* GLOBAL VARIABLES */

window.$primaryLanguage = 'en';
window.$secondaryLanguage = 'pl';
window.$primaryLanguageIconId = 'primary-lang-icon';
window.$secondaryLanguageIconId = 'secondary-lang-icon';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(

  <BrowserRouter>
    <Routes>
      <Route path="edit" element={<Provider store={store}><ProtectedLayout /></Provider>} >
        <Route path="" element={<h1>404 Not Found</h1>} />
        <Route path=":resumeId" element={<Provider store={store}><Edit /></Provider>} />
      </Route>
      <Route path="raw" element={<Provider store={store}><ProtectedLayout /></Provider>} >
        <Route path="" element={<h1>404 Not Found</h1>} />
        <Route path=":resumeId" element={<Provider store={store}><EditRaw /></Provider>} />
      </Route>

      <Route element={<Provider store={store}><HomeLayout /></Provider>}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="show" >
        <Route path="" element={<h1>404 Not Found</h1>} />
        <Route path=":resumeId" element={<Provider store={store}><Show /></Provider>} />
      </Route>

      <Route element={<Provider store={store}><ProtectedLayout /></Provider>}>
        <Route path="/" element={<Main />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  </BrowserRouter >
)

serviceWorker.register();
