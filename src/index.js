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
      <Route path="edit" element={<Provider store={store}><Edit /></Provider>} >
        <Route path=":resumeId" element={<Provider store={store}><Edit /></Provider>} />
      </Route>
      <Route path="raw" element={<Provider store={store}><EditRaw /></Provider>} >
        <Route path=":resumeId" element={<Provider store={store}><EditRaw /></Provider>} />
      </Route>
      <Route path="login" element={<Provider store={store}><Login /></Provider>} />
      <Route path="show" element={<Provider store={store}>< Show /></Provider>} >
        <Route path=":resumeId" element={<Provider store={store}>< Show /></Provider>} />
      </Route>
      <Route path="/" element={<Provider store={store}><Main /></Provider>} />
    </Routes>
  </BrowserRouter>

)

serviceWorker.register();
