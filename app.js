const IOManager = require("./lib/IOManager");
const messages = require("./assets/messages.json");
const { colorEncode, COLORS } = require("./lib/PrettyLogs");
const DateService = require("./lib/DateService");

const io = new IOManager();
const dateService = new DateService();

/**
 * Main function
 */
Main = async () => {
	welcome();

	dateA = await getDate(1); // date 1
	dateB = await getDate(2); // date 2

	io.closeManager();

	const distance = dateService.calculateGap(dateA, dateB);
	let result = messages.distance;
	result = result.replace(
		"$date1$",
		colorEncode(dateA.toString(), COLORS.MAGENTA)
	);
	result = result.replace(
		"$date2$",
		colorEncode(dateB.toString(), COLORS.MAGENTA)
	);
	result = result.replace("$distance$", colorEncode(distance, COLORS.GREEN));
	console.log(result);
};

/**
 * Gets date from user input and validates it
 * @param {Date} dateObj empty Date Model
 * @returns {Date} Date model object with date and isValid boolean set
 */
const getDate = async (dateNo) => {
	let isValid = false;
	let date = null;
	let message = "";
	if (dateNo === 1)
		message = colorEncode(
			`${messages.firstDate} (format: ${messages.format}):`,
			COLORS.BLUE
		);
	else if (dateNo === 2)
		message = colorEncode(
			`${messages.secondDate} (format: ${messages.format}):`,
			COLORS.BLUE
		);
	while (!isValid) {
		try {
			const stringDate = await io.requestInput(message);
			date = dateService.create(stringDate);
			isValid = true;
		} catch (err) {
			message = colorEncode(messages.dateInputErr, COLORS.RED);
		}
	}
	return date;
};

/**
 * Prints welcome messages & guide
 */
const welcome = () => {
	console.log(`\n`);
	console.log(colorEncode(`${messages.heading}`, COLORS.YELLOW));
	console.log(messages.welcome);
	console.log(messages.explanation);
	console.log(`\n`);
};

Main();
