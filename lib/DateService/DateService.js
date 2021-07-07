const Date = require("./Date");
const { isValidString, getIntArr, isValidDate, convertToJulianDayNumber } = require("./helper");

class DateService {

	/**
	 * Creates a Date object of a string if deemed valid
	 * @param {String} stringDate 
	 * @returns {Date}
	 */
	create(stringDate) {
		if (this._isValid(stringDate)) return new Date(getIntArr(stringDate));
		else throw Error(`[Error]: Incorrect date format in ${stringDate}`);
	}

	/**
	 * Calculates the distance between two dates using Julian Day Number 
	 * @param {Date} dateA 
	 * @param {Date} dateB 
	 * @returns {Number} integer gap
	 */
	calculateGap(dateA, dateB) {
		const julianDayNumberA = convertToJulianDayNumber(dateA);
		const julianDayNumberB = convertToJulianDayNumber(dateB);
		const distance = Math.abs(julianDayNumberB - julianDayNumberA);
		return distance - 1;
	}

	/**
	 * Returns true if string date passes validations; false otherwise
	 * @param {String} string 
	 * @returns {Boolean}
	 */
	_isValid(string) {
		return isValidString(string) && isValidDate(getIntArr(string));
	}
}

module.exports = DateService;