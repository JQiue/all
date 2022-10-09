import './App.css';

import {useEffect} from 'react'

function createMarkup() {
  return {
    __html: `<h1>HTTP 请求和响应服务<small>0.1.0</small></h1>
  <p><code>Base Url：http://httptest.jinqiu.wang/</code></p>
  <p>返回格式均为 JSON</p>
  <h2>方法</h2>
  <ul>
    <li>GET：<code>/get</code></li>
    <li>POST: <code>/post</code></li>
    <li>DELETE: <code>/delete</code></li>
    <li>PATCH: <code>/patch</code></li>
    <li>PUT: <code>/put</code></li>
  </ul>
  <h2>基本认证</h2>
  <ul>
    <li>GET: <code>/basic-auth/{username}/{password}</code></li>
  </ul>
  <h2>状态码</h2>
  <ul>
    <li>GET: <code>/status/{code}</code></li>
    <li>POST: <code>/status/{code}</code></li>
    <li>DELETE: <code>/status/{code}</code></li>
    <li>PATCH: <code>/status/{code}</code></li>
    <li>PUT: <code>/status/{code}</code></li>
  </ul>
  <h2>不同的响应数据</h2>
  <ul>
    <li>GET: <code>/base64/{value}</code> - 对 value 进行 Base64 解码</li>
    <li>GET: <code>/delay/{delay}</code> - 延迟 delay 响应，最大为 10 秒</li>
  </ul>
  <h2>cookie 操作</h2>
  <ul>
    <li>GET: <code>/cookies/set/{key}/{value}</code> - 设置 cookie</li>
    <li>GET: <code>/cookies</code> - 返回 cookie</li>
    <li>GET: <code>/cookies/delete/{key}</code> - 删除 cookie</li>
  </ul>
  <h2>freeback</h2>
  <p>
    作者：<a href="https://jinqiu.wang/about" target="_blank">JQiue</a> |
    项目地址：<a href="https://github.com/JQiue/http-test" target="_blank">Github</a>或<a href="https://gitee.com/JQiue/http-test" target="_blank">Gitee</a>
  </p>`,
  };
}


function App() {
  useEffect(() => {
    document.title = 'http-test'
    return () => {
    }
  }, [])
  
  return (
    <div class="app" dangerouslySetInnerHTML={createMarkup()}></div>
  );
}

export default App;
