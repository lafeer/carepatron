import React from 'react';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchRounded from '@mui/icons-material/SearchRounded';

interface SearchBarProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ClinetSearchBar({ value, onChange }: SearchBarProps) {
	const { t } = useTranslation();

	return (
		<FormControl sx={{ width: { xs: '100%', sm: '42%' } }}>
			<OutlinedInput
				id='search'
				placeholder={`${t('searchClients')}...`}
				size='small'
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='search clients'
							edge='end'
							sx={{ color: (theme) => theme.palette.grey[500] }}
						>
							<SearchRounded />
						</IconButton>
					</InputAdornment>
				}
				inputProps={{
					'aria-label': t('searchClients'),
				}}
				value={value}
				onChange={onChange}
			/>
		</FormControl>
	);
}
