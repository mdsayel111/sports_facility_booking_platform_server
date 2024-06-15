import { Server } from "http";
import { connect } from "mongoose";
import app from "./app";
import config from "./config";

const port = config.port;

// server
let server: Server;

// handle unhandleRejection
process.on("unhandledRejection", () => {
  // close all connection
  server.closeAllConnections();

  // turn off the server
  server.close(() => {
    console.log("Unhandle rejection and turn off the server !");
    process.exit(1);
  });
});

// handle uncaughtException
process.on("uncaughtException", () => {
  console.log("Uncaught exception !");
  process.exit(1);
});

// all connection and surver running function
async function main() {
  try {
    // Connect to MongoDB
    await connect(config.dbUrl as string);

    // listening server
    server = app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// call the main function
main();
