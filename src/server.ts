import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
const port = config.port;
async function main() {
  try {
    await prisma.$connect();
    console.log("connected database");

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error("error starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
