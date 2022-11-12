import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//  引入antd的less文件
import 'antd/dist/antd.less'
//  引入全局的less文件
import './index.less'
//  引入全局的i8n文件
import './i18n'
// 引入wangeditor编辑器的 css样式
import '@wangeditor/editor/dist/css/style.css'
import { Provider } from 'react-redux';
import store from './store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


