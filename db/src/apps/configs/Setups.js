const cors = require("cors");
const morgan = require("morgan");

module.exports = async (app, express) => {
	try {
		app.use(cors());
		app.use(morgan("short"));

		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
	} catch (err) {
		console.log(`Setup catch err: ${err}`);
	}
};
