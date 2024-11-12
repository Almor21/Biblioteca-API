function filterFields(obj: { [key: string]: any }, filter: string[]) {
	return Object.fromEntries(
		Object.entries(obj).filter((e) => filter.includes(e[0]))
	);
}

export default filterFields;