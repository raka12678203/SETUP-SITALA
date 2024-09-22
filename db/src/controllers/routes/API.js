const { Router } = require("express");
const router = new Router();

const Locations = require("./Locations.js");

try {
  router.use("/locations", Locations);
} catch (err) {
  console.log(`URL API catch err: ${err}`);
}

module.exports = router;
