import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Data, columns } from './ClientTable.utils';

export default function rowContent(_index: number, row: Data) {
	return (
		<>
			{columns.map((column) => {
				if (column.dataKey === 'firstName') {
					return (
						<TableCell key={column.dataKey}>
							<Typography variant='body2' fontWeight='500' color='primary.main'>
								{row.firstName} {row.lastName}
							</Typography>
						</TableCell>
					);
				}
				return <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>;
			})}
		</>
	);
}
