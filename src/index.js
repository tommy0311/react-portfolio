import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/login";
import Edit from "./routes/edit";

/* GLOBAL VARIABLES */

window.$primaryLanguage = 'en';
window.$secondaryLanguage = 'pl';
window.$primaryLanguageIconId = 'primary-lang-icon';
window.$secondaryLanguageIconId = 'secondary-lang-icon';

ReactDOM.render((
  <BrowserRouter>
    <Routes>
      <Route path="edit" element={<Edit />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.register();
