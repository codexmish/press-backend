import app from "./app";
const port = 8000;
async function main() {
  try {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error("error starting the server:", error);
    process.exit(1);
  }
}

main();
