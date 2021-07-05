class DateCalculator {
	constructor() {
		this._startDate = new Date("01/01/1900"); // mm/dd/yyyy @ 00:00:00
		this._endDate = new Date(new Date("12/31/2999").setHours(23, 59, 59)); // mm/dd/yyyy @ 00:00:00 (need to account for +1 day i.e. 24 hours)
	}

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

	_createDate(arr) {
		return new Date(arr[2], arr[1] - 1, arr[0]);
	}

	_getSplitDate(string) {
		const stringArr = string.split("/");
		let intArr = [];
		for (let s of stringArr) {
			intArr.push(parseInt(s));
		}
		return intArr;
	}

	_isBetween(date) {
		return date >= this._startDate && date < this._endDate;
	}
}

module.exports = DateCalculator;
