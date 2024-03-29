export const onlyNumbers = (text) => {
	if (text) {
		return text.split("").filter((letter) => letter.match(/\d/));
	} else {
		return "";
	}
};

export const maskPhone = (text) => {
	if (!text) {
		return "";
	}

	let numbers = onlyNumbers(text.toString());

	if (numbers.length < 1) {
		return "";
	}

	let ddd = numbers.slice(0, 2).join("");
	let prefix = numbers.slice(2, 6).join("");
	let sufix = numbers.slice(6, 11).join("");

	if (sufix.length > 0) {
		prefix = `${prefix}-`;
	}

	let fone = `(${ddd}) ${prefix}${sufix}`;

	if (sufix.length === 5) {
		fone = `${fone.slice(0, 9)}${fone.charAt(10)}-${fone.slice(11)}`;
	}
	if (text.length == 4) {
		fone = `(${ddd.slice(0, 1)}`;
	}

	return fone;
};
