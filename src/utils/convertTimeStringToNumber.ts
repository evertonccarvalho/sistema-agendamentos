export function convertTimeStringToNumber(timeString: string) {
	// console.log('Entrada:', timeString);

	if (typeof timeString !== 'string') {
		throw new Error('A entrada deve ser uma string');
	}

	const timeParts = timeString.split(":");


	const [hours, minutes] = timeParts.map(Number);
	// console.log('Horas:', hours);
	// console.log('Minutos:', minutes);



	const totalMinutes = hours * 60 + minutes;
	// console.log('Total de minutos:', totalMinutes);

	return totalMinutes;
}


export function convertMinutesToTimeString(minutes: number) {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}