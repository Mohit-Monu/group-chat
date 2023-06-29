require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const CronJob = require("cron").CronJob;

const sequelize = require("./database");

const userRoutes = require("./routes/user");
const groupchatRoutes = require("./routes/groupchat");
const adminRoutes = require("./routes/admin");

const USER = require("./models/user");
const GROUPCHAT = require("./models/groupchat");
const GROUPS = require("./models/groups");
const ARCHIVEDCHAT = require("./models/ArchivedChat");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    // credentials:true
  })
);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
  try {
    socket.on("message", (msg, username,id) => {
      socket.broadcast.emit("message", msg, username,id);
    });
    socket.on("file", (msg, username,id) => {
      console.log("file")
      socket.broadcast.emit("file", msg, username,id);
    });
  } catch (err) {
    console.log(err);
  }
});

app.use(userRoutes);
app.use(groupchatRoutes);
app.use(adminRoutes);

USER.hasMany(GROUPCHAT);
GROUPCHAT.belongsTo(USER);

USER.hasMany(GROUPS);
GROUPS.belongsTo(USER);

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/" + req.url));
});
const job = new CronJob(
  "0 36 3 * * *",
  async function () {
    const t = await sequelize.transaction();

    try {
      const data = await GROUPCHAT.findAll();
      data.forEach(async (element) => {
        await ARCHIVEDCHAT.create(
          {
            groupid: element.groupid,
            massage: element.massage,
            name: element.name,
            userId: element.userId,
            type:element.type
          },
          { transaction: t }
        );
      });
      await GROUPCHAT.destroy({ where: {} }, { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();

      console.log(err);
    }
  },
  null,
  true
);

sequelize
  .sync(
  // {force:true}
  )
  .then(http.listen(process.env.PORT))
  .catch((err) => {
    console.log(err);
  });
