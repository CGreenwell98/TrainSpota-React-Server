const mongoose = require("mongoose");
require("dotenv").config();
const app = require(`./app`);

// const MONGO_DB_URL = ""
// mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log("MongoDB connected..."))
// .catch(err => console.log(err))
// mongoose.set("useFindAndModify", false);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
