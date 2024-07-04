import Express from "express";
import cors from "cors";
import v1Router from "./routes/v1/index"
const app = Express()


app.use(cors({ origin: '*' }));
app.use(Express.json());

app.use("/api/v1", v1Router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
