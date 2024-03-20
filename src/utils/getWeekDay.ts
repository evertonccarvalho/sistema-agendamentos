interface GetWeekDaysParams {
	short?: boolean;
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
	const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long" });

	return Array.from({ length: 7 }, (_, index) => index)
		.map((day) => formatter.format(new Date(0, 0, day)))
		.map((weekDay) =>
			short
				? weekDay.substring(0, 3).toUpperCase()
				: weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
		);
}
