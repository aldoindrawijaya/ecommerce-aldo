const express = require("express");
const { postController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const upload = require("../middleware/multer");
const { db, query } = require("../database");

const router = express.Router();

router.get("/fetch-content", postController.fetchAllContent);
router.post("/add-content", postController.addContent);
router.post("/like", postController.likeContent);
router.post("/delete-content", postController.deleteContent);
router.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;

  let data = JSON.parse(req.body.data);

  let response = await query(
    `UPDATE content SET image = ${db.escape(
      filepath
    )} WHERE id_users = ${db.escape(data.id)} and id_content = ${db.escape(
      data.id_content
    )}`
  );

  res.status(200).send({ filepath });
});

module.exports = router;
