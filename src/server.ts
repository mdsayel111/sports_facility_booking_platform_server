import app from "./app";
import config from "./config";

const port = config.port;

// listening server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
