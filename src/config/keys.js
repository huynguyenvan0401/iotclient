let keys = null;

if (process.env.NODE_ENV === "production") {
  keys = require("./prod").default;
} else {
  keys = require("./dev").default;
}

export default keys;
