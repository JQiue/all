import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:1236/api/v1/probe'

function App() {
  const [info, setInfo] = useState({
    cpu: 0,
    mem: 0,
    uptime: 0,
    disk: 0,
    up: 0,
    rx: 0,
    tx: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/get');
      data.cpu = Number(data.cpu.toFixed(2)) * 100;
      data.mem = Number(data.mem.toFixed(2)) * 100;
      data.rx = (data.rx / 1024).toFixed(2);
      data.tx = (data.tx / 1024).toFixed(2);
      setInfo({...data})
    }
    const id = setInterval(fetchData, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="app">
      <p>
        {" "}
        CPU：<progress max="100" value={info.cpu}></progress>
        {info.cpu}/100%
      </p>
      <p>
        {" "}
        内存：<progress max="100" value={info.mem}></progress>
        {info.mem}/100%
      </p>
      <p>
        {" "}
        硬盘：<progress max="100" value={info.disk}></progress>
        {info.disk}/100%
      </p>
      <p>
        {" "}
        网络：下载 {info.tx}KB 上传 {info.rx}KB
      </p>
      <p>系统运行时间：{(info.uptime / 60 / 60).toFixed(1)} 小时</p>
    </div>
  );
}

export default App;
