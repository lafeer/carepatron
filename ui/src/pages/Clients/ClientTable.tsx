import * as React from 'react';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import rowContent from './ClientTableRow';
import FixedHeaderContent from './ClientTableHeader';
import { Data } from './ClientTable.utils';

const VirtuosoTableComponents: TableComponents<Data> = {
	Scroller: React.forwardRef<HTMLDivElement>((props, ref) => <TableContainer {...props} ref={ref} />),
	Table: (props) => (
		// @ts-ignore
		<Table
			{...props}
			sx={{
				borderRadius: '6px',
				borderCollapse: 'separate',
				backgroundColor: (theme) => theme.palette.background.paper,
			}}
		/>
	),
	// @ts-ignore
	TableHead,
	TableRow: ({ item: _item, ...props }) => (
		// @ts-ignore
		<TableRow
			{...props}
			sx={{
				'&:last-child td, &:last-child th': { border: 0 },
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: '#f5f5f5',
				},
			}}
		/>
	),
	TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function ReactVirtualizedTable({ clients }: { clients: IClient[] }) {
	return (
		<TableVirtuoso
			data={clients}
			style={{ width: '100%', borderRadius: '6px' }}
			components={VirtuosoTableComponents}
			fixedHeaderContent={FixedHeaderContent}
			itemContent={rowContent}
		/>
	);
}
