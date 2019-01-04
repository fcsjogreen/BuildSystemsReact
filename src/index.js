import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import './index.css';

import AppRoutes from './routes';
import * as serviceWorker from './serviceWorker';


render(    
    <Router>
        <AppRoutes />
    </Router>
    ,
    document.getElementById('root')
)


serviceWorker.unregister();
