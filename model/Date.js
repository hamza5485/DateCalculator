class Date {
	constructor(id) {
		this._id = id;
		this._date = "";
		this._isValid = false;
	}

	set date(date) {
		this._date = date;
	}

	set isValid(isValid) {
		this._isValid = isValid;
	}

	get id() {
		return this._id;
	}
	get date() {
		return this._date;
	}
	get isValid() {
		return this._isValid;
	}
}

module.exports = Date;
