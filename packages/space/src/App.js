import './App.css';
import {useState, useEffect} from 'react'

function App() {
  const [files, setFiles] = useState({});

  const upload = () => {
    const uploader = document.querySelector("#uploader");
    const up = document.querySelector("#upload");
    const uploadProgress = document.createElement("div");
    uploadProgress.className = "progress";
    document.body.append(uploadProgress);
    const formData = new FormData(uploader);
    const files = uploader.upload.files;
    const that = this;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.baseUrl + "/upload");
    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log("上传成功");
        uploader.upload.value = "";
      } else {
        console.log("失败了");
      }
    };
    xhr.upload.addEventListener("progress", function (event) {
      uploadProgress.style.width =
        (event.loaded / event.total) * 100 + "%";
    });
    xhr.upload.addEventListener("load", function (event) {
      uploadProgress.style.opacity = 0;
      uploadProgress.style.backgroundColor = "green";
      setTimeout(() => {
        uploadProgress.remove();
      }, 3000);
    });
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        that.getFiles();
      }
    };
    console.log(formData.get('file'));
    xhr.send(formData);
  };

  const download = (value) => [
    fetch(this.baseUrl + "/download?file=" + value.originalname).then(
      (res) => {
        const filename = res.headers
          .get("content-disposition")
          .split("=")[1];
        res.blob().then((blob) => {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = decodeURI(filename);
          a.click();
        });
      }
    )
  ]

  const getFiles = ()=> {
    const xhr = new XMLHttpRequest();
    const that = this;
    xhr.open("GET", this.baseUrl + "/files");
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        const result = JSON.parse(xhr.responseText);
        that.files = result;
      }
    };
    xhr.send();
  }

  return <div id="app">
          <header class="header">
        <h1>JQiue's space</h1>
      </header>

      <main>
        <section>
          <form enctype="multipart/form-data" id="uploader">
            <p><input type="file" name="file" multiple id="upload" /></p>
            <p><input type="button" value="提交" onClick={upload} /></p>
          </form>
        </section>

        <section>
          <div>
            <h2>文件列表：</h2>
          </div>
          <div>
            <ul id="file-list">
              {/* <li v-for="(value, name) in files" @click="download(value)">
                {{ name }}
              </li> */}
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <p>
          @2021-present <a href="https://jinqiu.wang" target="__blank">JQiue</a>
        </p>
      </footer>

  </div>;
}

export default App;
