const assert = require("assert");
const DateCalculator = require("./DateCalculator");
const { colorEncode, COLORS } = require("../PrettyLogs");

const dc = new DateCalculator();

const edgeStartDate = new Date(Date.UTC(1900, 0, 1));
const edgeEndDate = new Date(Date.UTC(2999, 11, 31)).setHours(23, 59, 59);
const normalDate = new Date(Date.UTC(1994, 3, 5));
const errorStartDate = new Date(Date.UTC(1800, 0, 1));
const errorEndDate = new Date(Date.UTC(3000, 11, 31));
const edgeStartDateStr = "01/01/1900";
const edgeEndDateStr = "31/12/2999";
const normalDateStr = "5/4/1994";
const errorStartDateStr = "01/01/1800";
const errorEndDateStr = "31/12/3000";
const testData1 = { dateStart: "2/6/1983", dateEnd: "22/6/1983", result: 19 };
const testData2 = { dateStart: "4/7/1984", dateEnd: "25/12/1984", result: 173 };
const testData3 = { dateStart: "3/1/1989", dateEnd: "3/8/1983", result: 2036 };

// testing _isBetween
try {
	console.log(
		colorEncode(`Testing _isBetween() @ DateCalculator.js`, COLORS.YELLOW)
	);
	assert.strictEqual(
		dc._isBetween(normalDate),
		true,
		`05/04/1994 is not in b/w 01/01/1900 - 31/12/2999`
	);
	log(`05/04/1994 is in b/w 01/01/1900 - 31/12/2999`, true);
	assert.strictEqual(
		dc._isBetween(edgeStartDate),
		true,
		`01/01/1900 is not in b/w 01/01/1900 - 31/12/2999`
	);
	log(`01/01/1900 is in b/w 01/01/1900 - 31/12/2999`, true);
	assert.strictEqual(
		dc._isBetween(edgeEndDate),
		true,
		`01/01/1900 is not in b/w 01/01/1900 - 31/12/2999`
	);
	log(`31/12/2999 is in b/w 01/01/1900 - 31/12/2999`, true);
	assert.strictEqual(
		dc._isBetween(errorStartDate),
		false,
		`01/01/1800 is in b/w 01/01/1900 - 31/12/2999`
	);
	log(`01/01/1800 is not in b/w 01/01/1900 - 31/12/2999`, true);
	assert.strictEqual(
		dc._isBetween(errorEndDate),
		false,
		`01/01/1800 is in b/w 01/01/1900 - 31/12/2999`
	);
	log(`31/12/3000 is not in b/w 01/01/1900 - 31/12/2999`, true);
} catch (error) {
	if (error instanceof assert.AssertionError) {
		log(error.message, false);
	}
}

// testing isvalid date
try {
	console.log(
		colorEncode(`Testing isValidDate() @ DateCalculator.js`, COLORS.YELLOW)
	);
	assert.strictEqual(
		dc.isValidDate(edgeStartDateStr),
		true,
		`${edgeStartDateStr} is not a valid date`
	);
	log(`${edgeStartDateStr} is a valid date`, true);
	assert.strictEqual(
		dc.isValidDate(edgeEndDateStr),
		true,
		`${edgeEndDateStr} is not a valid date`
	);
	log(`${edgeEndDateStr} is a valid date`, true);
	assert.strictEqual(
		dc.isValidDate(normalDateStr),
		true,
		`${normalDateStr} is not a valid date`
	);
	log(`${normalDateStr} is a valid date`, true);
	assert.strictEqual(
		dc.isValidDate(errorStartDateStr),
		false,
		`${errorStartDateStr} is a valid date`
	);
	log(`${errorStartDateStr} is not a valid date`, true);
	assert.strictEqual(
		dc.isValidDate(errorEndDateStr),
		false,
		`${errorEndDateStr} is a valid date`
	);
	log(`${errorEndDateStr} is not a valid date`, true);
} catch (error) {
	if (error instanceof assert.AssertionError) {
		log(error.message, false);
	}
}

// testing distanceCalculation
try {
	console.log(
		colorEncode(`Testing calcDistance() @ DateCalculator.js`, COLORS.YELLOW)
	);
	assert.strictEqual(
		dc.calcDistance(testData1.dateStart, testData1.dateEnd),
		testData1.result,
		`Distance b/w ${testData1.dateStart} - ${testData1.dateEnd} is not ${testData1.result} days`
	);
	log(
		`Distance b/w ${testData1.dateStart} - ${testData1.dateEnd} is ${testData1.result} days`,
		true
	);
	assert.strictEqual(
		dc.calcDistance(testData2.dateStart, testData2.dateEnd),
		testData2.result,
		`Distance b/w ${testData2.dateStart} - ${testData2.dateEnd} is not ${testData2.result} days`
	);
	log(
		`Distance b/w ${testData2.dateStart} - ${testData2.dateEnd} is ${testData2.result} days`,
		true
	);
	assert.strictEqual(
		dc.calcDistance(testData3.dateStart, testData3.dateEnd),
		testData3.result,
		`Distance b/w ${testData3.dateStart} - ${testData3.dateEnd} is not ${testData3.result} days`
	);
	log(
		`Distance b/w ${testData3.dateStart} - ${testData3.dateEnd} is ${testData3.result} days`,
		true
	);
} catch (error) {
	if (error instanceof assert.AssertionError) {
		log(error.message, false);
	}
}

/**
 * Prints message with it's respective styling
 * @param {String} message message to log
 * @param {Boolean} isSuccess which styling to use? success or error
 */
function log(message, isSuccess) {
	if (isSuccess)
		console.log(colorEncode(`Passed ✅: ${message}`, COLORS.GREEN));
	else console.log(colorEncode(`Failed ❌: ${message}`, COLORS.RED));
}
