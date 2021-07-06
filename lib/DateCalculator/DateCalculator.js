class DateCalculator {
	constructor() {
		this._startDate = new Date(Date.UTC(1900, 0, 1));
		this._endDate = new Date(Date.UTC(2999, 11, 31)).setHours(23, 59, 59);
		this._day = 1000 * 60 * 60 * 24; // millisecond to second to minute to hour to day
	}

	/**
	 * Checks if user input is a valid date object or not
	 * @param {String} input provided by user
	 * @returns {Boolean} true if valid date; false otherwise
	 */
	isValidDate(input) {
		if (
			input.length > 7 && // d/m/yyy, dd/m/yyyy, d/mm/yyyy, dd/mm/yyyy
			input.length < 11 &&
			input.includes("/") &&
			input.split("/").length - 1 === 2
		) {
			const arr = this._getSplitDate(input); // 0 dd 1 mm 2 yyyy
			const date = this._createDate(arr);
			return (
				date.getFullYear() === arr[2] &&
				date.getMonth() + 1 === arr[1] &&
				date.getDate() === arr[0] &&
				this._isBetween(date)
			);
		} else return false;
	}

	/**
	 * Calculates the distance between two dates
	 * LOGIC: 
	 * 		- calculate millisecond difference
	 * 		- convert to day (24 * 60 * 60 * 1000)
	 * 		- round off using math.floor
	 * 		- subtract 1 
	 * @param {String} dateA string date entered by user 
	 * @param {String} dateB string date entered by user 
	 * @returns {Number} integer distance between two dates
	 */
	calcDistance(dateA, dateB) {
		const dateAArr = this._getSplitDate(dateA);
		const dateBArr = this._getSplitDate(dateB);

		const dA = this._createDate(dateAArr);
		const dB = this._createDate(dateBArr);

		const milliseconds = Math.abs(dB - dA);
		const distance = Math.floor(milliseconds / this._day);
		return distance - 1;
	}

	/**
	 * Creates date from int array
	 * @param {Array} arr integer values created using this._getSplitDate()
	 * @returns {Date} object
	 */
	_createDate(arr) {
		return new Date(Date.UTC(arr[2], arr[1] - 1, arr[0])); // -1 because 0 months are indexed
	}

	/**
	 * Splits date string into array of int values
	 * @param {String} string date eg. 05/04/1994
	 * @returns {Array} eg. [5,4,1994]
	 */
	_getSplitDate(string) {
		const stringArr = string.split("/");
		let intArr = [];
		for (let s of stringArr) {
			intArr.push(parseInt(s));
		}
		return intArr;
	}

	/**
	 * Checks if date is between limits initialized in constructor
	 * @param {Date} date object created using this._createDate
	 * @returns {Boolean} true if between ; false otherwise
	 */
	_isBetween(date) {
		return date >= this._startDate && date <= this._endDate;
	}
}

module.exports = DateCalculator;
