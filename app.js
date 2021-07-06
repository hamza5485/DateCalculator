const IOManager = require("./lib/IOManager");
const DateCalculator = require("./lib/DateCalculator");
const messages = require("./assets/messages.json");
const DateObject = require("./model/Date");
const { colorEncode, COLORS } = require("./lib/PrettyLogs");

const io = new IOManager();
const dateManager = new DateCalculator();

/**
 * Main function
 */
Main = async () => {
	welcome();

	let dateA = new DateObject(1); // id = 1
	let dateB = new DateObject(2); // id = 2

	dateA = await getDate(dateA);
	dateB = await getDate(dateB);

	io.closeManager();

	const distance = dateManager.calcDistance(dateA.date, dateB.date);
	let result = messages.distance;
	result = result.replace("$date1$", colorEncode(dateA.date, COLORS.MAGENTA));
	result = result.replace("$date2$", colorEncode(dateB.date, COLORS.MAGENTA));
	result = result.replace("$distance$", colorEncode(distance, COLORS.GREEN));
	console.log(result);
};

/**
 * Gets date from user input and validates it  
 * @param {Date} dateObj empty Date Model 
 * @returns {Date} Date model object with date and isValid boolean set
 */
const getDate = async (dateObj) => {
	let obj = dateObj;
	let message =
		obj.id === 1
			? colorEncode(
					`${messages.firstDate} (format: ${messages.format}):`,
					COLORS.BLUE
			  )
			: colorEncode(
					`${messages.secondDate} (format: ${messages.format}):`,
					COLORS.BLUE
			  );
	while (!obj.isValid) {
		const date = await io.requestInput(message);
		const isValidDate = dateManager.isValidDate(date);
		if (!isValidDate)
			message = colorEncode(messages.dateInputErr, COLORS.RED);
		else {
			obj.date = date;
			obj.isValid = isValidDate;
		}
	}
	return obj;
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
