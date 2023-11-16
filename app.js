const express = require('express');
const path = require('path');

const app = express();
const port = 7000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理根路径的请求
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

