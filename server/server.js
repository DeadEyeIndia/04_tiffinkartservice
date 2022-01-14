const path = require("path");
const app = require("./app");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on => http://locahost:${PORT}`);
});
