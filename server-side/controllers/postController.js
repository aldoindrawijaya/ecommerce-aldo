const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mail = require("nodemailer/lib/mailer");

module.exports = {
  fetchAllContent: async (req, res) => {
    try {
      const content = await query(
        `select *  from content join users on content.id_users = users.id_users;`
      );
      return res.status(200).send(content);
    } catch (error) {
      res.status(error.status || 200).send(error);
    }
  },
  addContent: async (req, res) => {
    console.log("asdf");
    try {
      const { image, caption, number_of_like, id_users } = req.body;
      const created_date = new Date();
      console.log(
        `INSERT INTO content VALUES (null, ${db.escape(image)}, ${db.escape(
          caption
        )}, ${db.escape(created_date)}, ${db.escape(
          number_of_like
        )}, ${db.escape(id_users)}`
      );

      let addContents = `INSERT INTO content VALUES (null, ${db.escape(
        image
      )}, ${db.escape(caption)}, ${db.escape(created_date)}, ${db.escape(
        number_of_like
      )}, ${db.escape(id_users)})`;

      let addProduct = await query(addContents);

      return res
        .status(200)
        .send({ data: addProduct, message: "Content has been created" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).send(error);
    }
  },

  likeContent: async (req, res) => {
    try {
      const { number_of_like, id_content } = req.body;
      let updatedLike = number_of_like + 1;

      await query(
        `UPDATE content SET number_of_like = ${updatedLike} WHERE id_content = ${db.escape(
          id_content
        )}`
      );

      return res.status(200).send({ message: "Like Success" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 200).send(error);
    }
  },

  deleteContent: async (req, res) => {
    const { id_content } = req.body;

    console.log(id_content);
    try {
      await query(`DELETE FROM content WHERE id_content = ${id_content}`);

      return res.status(200).send({ message: "Delete Success" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 200).send(error);
    }
  },
};
