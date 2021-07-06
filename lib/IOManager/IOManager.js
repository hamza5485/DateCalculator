const readline = require("readline");

class IOManager {
	constructor() {
		this._rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout // dont remove - doesn't work properly
		});
	}

	/**
	 * adds new line to message so input is at next line in cli
	 * @param {String} message 
	 * @returns {String} \n character appended message
	 */
	_formatMessage(message) {
		return `${message}\n`;
	}

	/**
	 * Prints message and takes user input
	 * @param {String} message Message to print before taking user input 
	 * @returns {String} input from user
	 */
	async requestInput(message) {
		const formattedMsg = this._formatMessage(message);
		return new Promise((resolve) => {
			this._rl.question(formattedMsg, (userInput) => {
				resolve(userInput.trim());
			});
		});
	}

	/**
	 * closes IO interface
	 */
    closeManager() {
        this._rl.close();
    }
}

module.exports = IOManager;
