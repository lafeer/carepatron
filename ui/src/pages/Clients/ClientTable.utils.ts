export interface Data {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

export interface ColumnData {
	dataKey: keyof Data;
	label: string;
}

export const columns: ColumnData[] = [
	{
		label: 'name',
		dataKey: 'firstName',
	},
	{
		label: 'phone',
		dataKey: 'phoneNumber',
	},
	{
		label: 'email',
		dataKey: 'email',
	},
];
