const assert = require("assert");
const DateService = require("./DateService");
const { colorEncode, COLORS } = require("../PrettyLogs");
const Date = require("./Date");

const dateservice = new DateService();

const line = "-".repeat(process.stdout.columns);

const goodData = [
	"01/01/1900", // edge
	"31/12/2999", // edge
	"5/4/1994", // normal
	"29/2/2000", // leap
];
const testData = [
	"2/6/1983",
	"22/6/1983",
	"4/7/1984",
	"25/12/1984",
	"3/1/1989",
	"3/8/1983",
]; // provided by company
const testDataResults = [19, 173, 2036]; // provided by company
const badData = [
	"01/01/1800", // outside range
	"31/12/3000", // outside range
	"29/2/1999", // leap year
	"30/2/2000", // wrong
	"abcdefg", // wrong
	"1112223334445566", // wrong
	"32/12/2000", // wrong
	"15/13/2000", // wrong
];

console.log(colorEncode(line, COLORS.MAGENTA));
log(`=========== Testing DataService.js ===========`, 0);
console.log(colorEncode(line, COLORS.MAGENTA));

// DateService.create()
// internally also tests DateService._isValid()
log(`Testing fx: create() && _isValid()`, 0);
goodData.forEach((el) => {
	try {
		assert.deepStrictEqual(
			dateservice.create(el),
			new Date(el.split("/").map((s) => parseInt(s))),
			`${el} is not a valid date format and/or exists outside range`
		);
		log(`${el} is a valid date`, 1);
	} catch (error) {
		if (error instanceof assert.AssertionError) {
			log(error.message, 2);
		}
	}
});
badData.forEach((el) => {
	const err = `${el} is not a valid date format and/or exists outside range`;
	try {
		assert.deepStrictEqual(
			dateservice.create(el),
			new Date(el.split("/").map((s) => parseInt(s))),
			err
		);
		log(`${el} is a valid date`, 1);
	} catch (error) {
		if (error instanceof assert.AssertionError) {
			log(error.message, 2);
		} else log(err, 1); // try catch thrown
	}
});

// DateService.calculateGap()
log(`Testing fx: calculateGap()`, 0);
testData.forEach((el, i) => {
	if (i % 2 === 0) {
		try {
			const d1 = dateservice.create(el);
			const d2 = dateservice.create(testData[i + 1]);
			const result =
				i === 0
					? testDataResults[0]
					: i === 2
					? testDataResults[1]
					: i === 4
					? testDataResults[2]
					: null;
			assert.deepStrictEqual(
				dateservice.calculateGap(d1, d2),
				result,
				`Distance b/w ${d1.toString()} - ${d2.toString()} is not ${result} days`
			);
			log(
				`Distance b/w ${d1.toString()} - ${d2.toString()} is ${result} days`,
				1
			);
		} catch (error) {
			if (error instanceof assert.AssertionError) {
				log(error.message, 2);
			}
		}
	}
});

/**
 * Prints message with it's respective styling
 * @param {String} message message to log
 * @param {Number} messageType 0: warn, 1: success, 2:error
 */
function log(message, messageType) {
	if (messageType === 0)
		console.log(colorEncode(`${message}`, COLORS.YELLOW));
	if (messageType === 1)
		console.log(colorEncode(`Passed ✅: ${message}`, COLORS.GREEN));
	if (messageType === 2)
		console.log(colorEncode(`Failed ❌: ${message}`, COLORS.RED));
}
