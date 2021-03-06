const Date = require("./Date");

/**
 * Checks if date string is in valid format, returns true if valie; false otherwise
 * @param {String} string representation of date in dd/mm/yyyy format
 * @returns {Boolean}
 */
const isValidString = (string) =>
	string.length > 7 && // d/m/yyyy, dd/m/yyyy, d/mm/yyyy, dd/mm/yyyy
	string.length < 11 &&
	string.includes("/") &&
	string.split("/").length === 3;

/**
 * Converts date into integer array:
 * "dd/mm/yyyy" ~> [dd, mm, yyyy] := "05/04/1995" ~> [5, 4, 1994]
 * @param {String} string representation of date in dd/mm/yyyy format
 * @returns {Array}
 */
const getIntArr = (string) => string.split("/").map((el) => parseInt(el));

/**
 * Performs date validations and returns true if date is valid, else returns false
 * @param {Array} dateArray Integer array representing date = [day, month, year] := [5, 4, 1994]
 * @returns {Boolean}
 */
const isValidDate = (dateArray) => {
	const day = dateArray[0];
	const month = dateArray[1];
	const year = dateArray[2];

	if (year < 1900 || year > 2999) return false;
	if (month < 1 || month > 12) return false;
	if (monthHasThirty(month) && day > 30) return false;
	if (monthHasThirtyOne(month) && day > 31) return false;
	if (month === 2 && isLeapYear(year) && day > 29) return false;
	if (month === 2 && !isLeapYear(year) && day > 28) return false;
	return true;
};

/**
 * Returns true if month has 30 days, else returns false
 * @param {Number} month integer representing month
 * @returns {Boolean}
 */
const monthHasThirty = (month) =>
	month === 4 || month === 6 || month === 9 || month === 11;

/**
 * Returns true if month has 31 days, else returns false
 * @param {Number} month integer representing month
 * @returns {Boolean}
 */
const monthHasThirtyOne = (month) => month !== 2 && !monthHasThirty(month);

/**
 * Returns true if leap year, else returns false
 * logic based on: https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year#formula-to-determine-whether-a-year-is-a-leap-year
 * @param {Number} year integer representing year
 * @returns {Boolean}
 */
const isLeapYear = (year) =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/**
 * Converts date to Julian Day Number (https://quasar.as.utexas.edu/BillInfo/JulianDatesG.html)
 * @param {Date} date
 * @returns {Number} Double/Floating Point number
 */
const convertToJulianDayNumber = (date) => {
	const day = date.day;
	let month = date.month;
	let year = date.year;
	if (month === 1 || month === 2) {
		year -= 1;
		month += 12;
	}
	const a = Math.floor(year / 100);
	const b = Math.floor(a / 4);
	const c = 2 - a + b;
	const e = Math.floor(365.25 * (year + 4716));
	const f = Math.floor(30.6001 * (month + 1));
	const julianDayNumber = c + day + e + f - 1524.5;
	return julianDayNumber;
};

module.exports = {
	isValidString: isValidString,
	getIntArr: getIntArr,
	isValidDate: isValidDate,
	monthHasThirty: monthHasThirty,
	monthHasThirtyOne: monthHasThirtyOne,
	isLeapYear: isLeapYear,
	convertToJulianDayNumber: convertToJulianDayNumber,
};
