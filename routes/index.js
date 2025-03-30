var express = require("express");
var router = express.Router();
const EchartControler = require("../controllers/EchartControler");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const chunks = [];

router.post("/upload", upload.single("chunk"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // 文件片段存储在内存中，可以通过 req.file.buffer 访问
  const chunkBuffer = req.file.buffer;

  const chunkInfo = {
    hash: req.body.hash,
    index: req.body.index,
    chunkName: req.body.chunkName,
    fileName: req.body.fileName,
    totalChunks: parseInt(req.body.totalChunks),
  };

  // 将片段保存到数组中
  chunks.push({ buffer: chunkBuffer, index: chunkInfo.index });

  //  // 如果所有片段都已上传，进行合并
  if (chunks.length === chunkInfo.totalChunks) {
    const sortedChunks = chunks.sort((a, b) => a.index - b.index);
    const mergedBuffer = Buffer.concat(
      sortedChunks.map((chunk) => chunk.buffer)
    );

    try {
      // 将合并后的文件写入磁盘
      fs.writeFileSync(path.join(uploadDir, chunkInfo.fileName), mergedBuffer);
    } catch (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file to disk.", err);
    }

    // 清空片段数组
    chunks.length = 0;
    return res.send({
      message: "File uploaded successfully.",
      code: 200,
    });
  }

  // 返回成功响应
  return res.send({
    message: "Chunk uploaded successfully.",
    code: 207,
  });
});

router.get("/api/getEchart", EchartControler.getEchart);
router.get("/api/getBigData", EchartControler.getBigData);

const testController = require("../controllers/testController");
router.post("/api/test", testController.test);
router.get("/api/getMoreData", testController.getMoreData);

const realtimeEchartController = require("../controllers/realtimeEchartController");
router.get("/api/events", realtimeEchartController.openSSE);

const selectController = require("../controllers/selectController");
router.get("/api/getSelectData", selectController.getSelectData);

module.exports = router;
