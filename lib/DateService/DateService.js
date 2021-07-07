const Date = require("./Date");
const { isValidString, getIntArr, isValidDate } = require("./helper");

class DateService {
	constructor() {
		// this._startDate = new Date(Date.UTC(1900, 0, 1));
		// this._endDate = new Date(Date.UTC(2999, 11, 31)).setHours(23, 59, 59);
		// this._day = 1000 * 60 * 60 * 24; // millisecond to second to minute to hour to day
	}

	create(stringDate) {
		if (this._isValid(stringDate)) return new Date(getIntArr(stringDate));
		else throw Error(`[Error]: Incorrect date format in ${stringDate}`);
	}

	_isValid(string) {
		return isValidDate(string) && isValidDate(getIntArr(string));
	}
}

module.exports = DateService;

/**
 
const dateservice = require('./DateService');
const ds = new dateservice();
ds.create("05/04/1994");



ds._isValid("05/04/1994");

 */
