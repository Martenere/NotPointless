import express, { Router, static as staticFiles } from "express";

import { fileURLToPath } from "url";

import { dirname } from "path";

const app = express();

const router = Router();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const path = `${__dirname}/dist/`;

const port = 3000;

router.use(function (req, res, next) {
  console.log("/" + req.method);

  next();
});

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.use(staticFiles(path));

app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
