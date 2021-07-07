class Date {
	constructor(dateArray) {
		this._day = dateArray[0];
		this._month = dateArray[1];
		this._year = dateArray[2];
	}

	// constructor() {
	// 	this._day = null;
	// 	this._month = null;
	// 	this._year = null;
	// }

	// set(dateArray) {
	// 	this._day = dateArray[0];
	// 	this._month = dateArray[1];
	// 	this._year = dateArray[2];
	// }

	get day() {
		return this._day;
	}

	get month() {
		return this._month;
	}

	get year() {
		return this._year;
	}

	// set day(day) {
	// 	this._day = day;
	// }

	// set month(month) {
	// 	this._month = month;
	// }

	// set year(year) {
	// 	this._year = year;
	// }
}

module.exports = Date;
