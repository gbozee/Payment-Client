// server.js
const jsonServer = require("json-server");
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const server = createApp();
let token = "THISISATESTTOKEN";
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (email === "james@example.com" && password === "password101") {
    res.json({ token });
  }
  res.json(403, { msg: "Not Authorized" });
});

server.post("/authenticate", (req, res) => {
  if (token === req.body.token) {
    res.json({ msg: "Valid Token" });
  }
  res.json(403, { msg: "Not authorized" });
});
server.post("/make-payment/:order", (req, res) => {
  res.json({});
});
router.db._.id = "order";
server.db = router.db;
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

function createApp() {
  const app = jsonServer.create();

  //   const defaultsOpts = {
  //     logger: !argv.quiet,
  //     readOnly: argv.readOnly,
  //     noCors: argv.noCors,
  //     noGzip: argv.noGzip,
  //     bodyParser: true
  //   };

  //   if (argv.static) {
  //     defaultsOpts.static = path.join(process.cwd(), argv.static);
  //   }

  const defaults = jsonServer.defaults();
  app.use(defaults);

  return app;
}
