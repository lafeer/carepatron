import React from 'react';
import { useTranslation } from 'react-i18next';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { columns } from './ClientTable.utils';

export default function FixedHeaderContent() {
	const { t } = useTranslation();
	return (
		<TableRow>
			{columns.map((column) => (
				<TableCell
					key={column.dataKey}
					variant='head'
					sx={{
						backgroundColor: 'background.paper',
					}}
				>
					{t(column.label)}
				</TableCell>
			))}
		</TableRow>
	);
}
