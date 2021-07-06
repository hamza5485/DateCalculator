const COLORS = {
	GREEN: "\x1b[32m",
	YELLOW: "\x1b[33m",
	RED: "\x1b[31m",
	BLUE: "\x1b[34m",
	MAGENTA: "\x1b[35m",
	END: "\x1b[m",
};

const colorEncode = (message, color) => {
	return `${color}${message}${COLORS.END}`;
};

module.exports = {
	COLORS: COLORS,
	colorEncode: colorEncode,
};
