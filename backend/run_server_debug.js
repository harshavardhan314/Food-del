process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.error(
    "unhandledRejection at:",
    p,
    "reason:",
    reason && reason.stack ? reason.stack : reason
  );
  process.exit(1);
});

try {
  require("./server.js");
} catch (err) {
  console.error(
    "require(server.js) threw:",
    err && err.stack ? err.stack : err
  );
  process.exit(1);
}
