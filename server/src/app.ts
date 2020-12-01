import { initDatabase, closeDataBase } from './services/database';
import { initServer, closeServer } from './services/server';

const start = async () => {
  try {
    console.log("Initializing database module");
    await initDatabase();
  } catch (error) {
    console.log(error);
    process.exit(1); // Non-zero failure code
  }

  try {
    console.log("Initializing Server");
    await initServer();
  } catch (error) {
    console.log('error', error)
    process.exit(1); // Non-zero failure code
  }
}

const shutdown = async (e?: any) => {
  let err = e;

  console.log("Shutting down application");

  // Closing DataBase
  try {
    console.log("Closing database module");
    closeDataBase();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }

  // Closing Server
  try {
    console.log("Closing server module");
    await closeServer();
  } catch (e) {
    console.error(e);
    err = err || e;
  }

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", (signal) => {
  console.log(`Received ${signal}`);
  shutdown();
});

// Handle ^C
process.on("SIGINT", async (signal) => {
  console.log(`Received ${signal}`);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception");
  console.error(err);
  shutdown(err);
});

start();