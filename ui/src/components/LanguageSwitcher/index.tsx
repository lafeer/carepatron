import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import LanguageIcon from '@mui/icons-material/Language';

export default function LanguageSwitcher() {
	const [language, setLanguage] = useState('en');
	const { i18n } = useTranslation();

	const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
		setLanguage(newLanguage);
		i18n.changeLanguage(newLanguage);
	};

	return (
		<Stack direction='row' alignItems='center' spacing={1}>
			<LanguageIcon color='primary' />
			<ToggleButtonGroup
				value={language}
				exclusive
				size='small'
				onChange={handleChangeLanguage}
				aria-label='text language'
			>
				<ToggleButton value='en' aria-label='englsh'>
					EN
				</ToggleButton>
				<ToggleButton value='fr' aria-label='french'>
					FR
				</ToggleButton>
			</ToggleButtonGroup>
		</Stack>
	);
}
