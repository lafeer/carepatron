import React, { memo, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { StateContext } from '../../store/DataProvider';
import { getClients } from '../../services/api';
import Page from '../../components/Page';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ClientTable from './ClientTable';
import ClientSearchBar from './ClientSearchBar';
import CreateClientDialog from './CreateClientDialog';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const [clients, setClients] = useState([] as IClient[]);
	const [searchFilter, setSearchFilter] = useState('');
	const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		getClients()
			.then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }))
			.catch((err) => console.log(err));
	}, [dispatch]);

	useEffect(() => {
		setClients(state.clients);
	}, [state.clients]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchFilter = e.target.value;
		setSearchFilter(searchFilter);
		const filteredClients = state.clients.filter(
			(client) =>
				client.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
				client.lastName.toLowerCase().includes(searchFilter.toLowerCase())
		);
		setClients(filteredClients);
	};

	const handleClickAddClient = () => {
		setOpenAddClientDialog(true);
	};

	const handleCloseAddClientDialog = () => {
		setOpenAddClientDialog(false);
	};

	return (
		<Page>
			<Stack direction='column' sx={{ height: '100%' }}>
				<Stack direction='row' justifyContent='space-between'>
					<Typography variant='h4' sx={{ textAlign: 'start' }}>
						{t('clients')}
					</Typography>
					<LanguageSwitcher />
				</Stack>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					justifyContent='space-between'
					sx={{ mt: 4, mb: 2 }}
				>
					<ClientSearchBar value={searchFilter} onChange={handleSearch} />
					<Button variant='contained' size='small' onClick={handleClickAddClient}>
						{t('createNewClient')}
					</Button>
				</Stack>

				<Paper
					sx={{
						width: '100%',
						height: '100%',
						marginTop: 3,
						backgroundColor: 'transparent',
					}}
					elevation={0}
				>
					<ClientTable clients={clients} />
				</Paper>
			</Stack>
			<CreateClientDialog open={openAddClientDialog} onClose={handleCloseAddClientDialog} />
		</Page>
	);
}

export default memo(Clients);
