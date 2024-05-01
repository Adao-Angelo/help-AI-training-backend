import Express from "express";

const app = Express();
app.use(Express.json());

app.listen(9000, () => console.log("Server listening"));
