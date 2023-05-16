const express = require("express");
const PORT = 8002;
const app = express();
const { db, query } = require("./database");
const cors = require("cors");
const { authRoutes } = require("./routes");
const { postRoutes } = require("./routes");
const { body, validationResult } = require("express-validator");
const upload = require("./middleware/multer");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;

  let data = JSON.parse(req.body.data);

  let response = await query(
    `UPDATE users SET imagePath = ${db.escape(
      filepath
    )} WHERE id_users = ${db.escape(data.id)}`
  );
  console.log(response);

  res.status(200).send({ filepath });
});

app.post(
  "/validation",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    res.status(200).send(req.body);
  }
);

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
