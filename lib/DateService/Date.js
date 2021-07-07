class Date {
	constructor(dateArray) {
		this._day = dateArray[0];
		this._month = dateArray[1];
		this._year = dateArray[2];
	}

	get day() {
		return this._day;
	}

	get month() {
		return this._month;
	}

	get year() {
		return this._year;
	}

	toString() {
		return `${this.day}/${this.month}/${this.year}`;
	}
}

module.exports = Date;
