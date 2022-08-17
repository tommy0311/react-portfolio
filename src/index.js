import React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/login";
import Edit from "./routes/edit";
import Show from "./routes/show";

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
      <Route path="edit" element={<Edit />} />
      <Route path="login" element={<Login />} />
      <Route path="show" element={< Show />} >
        <Route path=":resumeId" element={<Show />} />
      </Route>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>

)

serviceWorker.register();
