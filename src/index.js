import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//  引入antd的less文件
import 'antd/dist/antd.less'
//  引入全局的less文件
import './index.less'
//  引入全局的i8n文件
import './i18n'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


