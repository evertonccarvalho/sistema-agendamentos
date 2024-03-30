export const onlyNumbers = (text: string): string => {
	if (text) {
		return text.split("").filter((letter) => letter.match(/\d/)).join(""); // Use .join("") para converter a matriz de caracteres em uma string
	}
	return "";

};

export const maskPhone = (text: string): string => {
	if (!text) {
		return "";
	}

	const numbers = onlyNumbers(text.toString());

	if (numbers.length < 1) {
		return "";
	}

	const ddd = numbers.slice(0, 2);
	let prefix = numbers.slice(2, 7);
	const sufix = numbers.slice(7, 11);

	if (sufix.length > 0) {
		prefix = `${prefix}-`;
	}

	const formattedPhone = `(${ddd}) ${prefix}${sufix}`;

	return formattedPhone;
};
