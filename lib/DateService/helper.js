/**
 *
 * @param {String} string
 * @returns {Boolean}
 */
const isValidString = (string) =>
	string.length > 7 && // d/m/yyy, dd/m/yyyy, d/mm/yyyy, dd/mm/yyyy
	string.length < 11 &&
	string.includes("/") &&
	string.split("/").length === 3;

/**
 *
 * @param {String} string
 * @returns {Array}
 */
const getIntArr = (string) => string.split("/").map((el) => parseInt(el));

/**
 *
 * @param {Array} dateArray
 * @returns {Boolean}
 */
const isValidDate = (dateArray) => {
	const day = dateArray[0];
	const month = dateArray[1];
	const year = dateArray[2];

	if (year <= 999 || year > 9999) return false;
	if (month < 1 || month > 12) return false;
	if (monthHasThirty(month) && day > 30) return false;
	if (monthHasThirtyOne(month) && day > 31) return false;
	if (month === 2 && isLeapYear(year) && day > 29) return false;
	if (month === 2 && !isLeapYear(year) && day > 28) return false;
	return true;
};

/**
 *
 * @param {Number} month
 * @returns {Boolean}
 */
const monthHasThirty = (month) =>
	month === 4 || month === 6 || month === 9 || month === 11;

/**
 *
 * @param {Number} month
 * @returns {Boolean}
 */
const monthHasThirtyOne = (month) => month !== 2 && !monthHasThirty(month);

/**
 *
 * @param {Number} year
 * @returns {Boolean}
 */
const isLeapYear = (year) =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

module.exports = {
	isValidString: isValidString,
	getIntArr: getIntArr,
	isValidDate: isValidDate,
};
