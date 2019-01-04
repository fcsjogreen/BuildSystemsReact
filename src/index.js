import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import './index.css';
import {Provider} from 'unstated';
import AppRoutes from './routes';
import * as serviceWorker from './serviceWorker';


render(  
    <Provider>
    <Router>
        <AppRoutes />
    </Router>
    </Provider>
    ,
    document.getElementById('root')
)


serviceWorker.unregister();
