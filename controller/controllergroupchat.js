const GROUPCHAT = require("../models/groupchat");
const GROUPS = require("../models/groups");
const sequelize = require("../database");
const AWS = require("aws-sdk");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { Op } = require("sequelize");
async function sendmess(req, res) {
  const t = await sequelize.transaction();
  try {
    const message = req.body.message;
    await GROUPCHAT.create(
      {
        type:"text",
        massage: message,
        name: req.user.name,
        userId: req.user.id,
        groupid: req.body.group_id,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ messages: "message sent", username: req.user.name });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: "something went wrong" });
  }
}
async function loadmsg(req, res) {
  const group_id = req.params.group_id;
  try {
    const messages = await GROUPCHAT.findAll({ where: { groupid: group_id } });
    res.status(200).json({ messages: messages, userId: req.user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
async function creategroup(req, res) {
  const t = await sequelize.transaction();
  try {
    await GROUPS.create(
      {
        name: req.body.groupname,
        role: "Admin",
        memberName: req.user.name,
        userId: req.user.id,
        group_id: req.body.datenow,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ messages: "group created successfully" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: "something went wrong" });
  }
}
async function getgroup(req, res) {
  try {
    const id = req.user.id;
    const data = await GROUPS.findAll({ where: { userId: id } });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
async function memberdetail(req, res) {
  try {
    const data = await GROUPS.findAll({
      where: { group_id: req.body.group_id },
    });
    res.status(200).json({ data: data, user: req.user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
async function sendfile(req, res) {
  upload.single("file")(req, res, async (err) => {
    const t = await sequelize.transaction();
    try {
      const userId = req.user.id;
      console.log(req.file)
      const filename = "File" + userId + "/" + Date.now()+req.file.originalname
      const fileURl = await uploadToS3(req.file.buffer, filename);
      await GROUPCHAT.create(
        {
          groupid:req.params.group_id,
          userId: userId,
          massage: fileURl,
          name: req.user.name,
          type:"file"
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({ data:fileURl,username:req.user.name, success: true });
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(500).json({ message: "Something went wrong " });
    }
  });
}
async function uploadToS3(data, filename) {
  try {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    const response = await s3bucket.upload(params).promise();
    return response.Location;
  } catch (err) {
    console.log(err);
    return err;
  }
}
module.exports = {
  sendmess,
  loadmsg,
  creategroup,
  getgroup,
  memberdetail,
  sendfile,
};
