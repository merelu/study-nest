import * as express from "express";

const app: express.Express = express();

const port: number = 3000;

app.get("/testsdassd", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ name: "hwang gyuha", age: 14, friends: ["ss", "ys", "ye"] });
  res.send("asdf");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
