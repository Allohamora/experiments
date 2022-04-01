import React from 'react';
import ReactDOM from 'react-dom';
import localStorageDataProvider from 'ra-data-local-storage';
import { Admin, Resource } from 'react-admin';
import authors from './authors';
import posts from './posts';
import { Dashboard } from './components/Dashboard';

const dataProvider = localStorageDataProvider();

ReactDOM.render(
  <React.StrictMode>
    <Admin dataProvider={dataProvider} dashboard={Dashboard} disableTelemetry>
      <Resource {...posts} />
      <Resource {...authors} />
    </Admin>
  </React.StrictMode>,
  document.getElementById('root'),
);
