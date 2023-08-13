import React, { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { createClient } from '../../services/api';
import { StateContext } from '../../store/DataProvider';
import TextField from '../../components/TextField';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../../utils/constants';

interface DialogProps {
	open: boolean;
	onClose: () => void;
}

function CreateClientDialog({ open, onClose }: DialogProps) {
	const { dispatch, state } = useContext(StateContext);
	const [activeStep, setActiveStep] = useState(0);
	const [client, setClient] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' } as any);
	const [error, setError] = useState({ email: false, phoneNumber: false } as any);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation();

	const steps = [t('personalDetails'), t('contactDetails')];

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			return createClient(client)
				.then(() => {
					dispatch({ type: 'CREATE_CLIENT', data: { id: state.clients.length, ...client } });
					setClient({ firstName: '', lastName: '', email: '', phoneNumber: '' });
					onClose();
				})
				.catch((err) => console.log(err));
		}
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const isNextDisabled = () => {
		if (activeStep === 0) {
			return !client.firstName || !client.lastName;
		}
		if (activeStep === 1) {
			return !client.email || error.email || !client.phoneNumber || error.phoneNumber;
		}
		return false;
	};

	const handleChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		//validate email
		if (e.target.name === 'email') {
			if (!EMAIL_REGEXP.test(e.target.value)) {
				setError({ ...error, email: true });
			} else {
				setError({ ...error, email: false });
			}
		}
		//validate phoneNumber
		if (e.target.name === 'phoneNumber') {
			if (!PHONE_REGEXP.test(e.target.value)) {
				setError({ ...error, phoneNumber: true });
			} else {
				setError({ ...error, phoneNumber: false });
			}
		}

		setClient({
			...client,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby='dialog-title'
			open={open}
			fullWidth
			fullScreen={fullScreen}
			maxWidth='xs'
		>
			<DialogTitle id='dialog-title'>
				{t('createNewClient')}
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Stepper activeStep={activeStep} sx={{ mt: 1, mb: 4 }}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === 0 && (
					<Stack spacing={2} sx={{ px: 1 }}>
						<TextField
							label={t('firstName')}
							name='firstName'
							value={client.firstName}
							onChange={handleChangeFormValues}
						/>
						<TextField
							label={t('lastName')}
							name='lastName'
							value={client.lastName}
							onChange={handleChangeFormValues}
						/>
					</Stack>
				)}
				{activeStep === 1 && (
					<Stack spacing={2} sx={{ px: 1 }}>
						<TextField
							label={t('email')}
							name='email'
							value={client.email}
							onChange={handleChangeFormValues}
							error={error.email}
						/>
						<TextField
							label={t('phoneNumber')}
							name='phoneNumber'
							value={client.phoneNumber}
							onChange={handleChangeFormValues}
							error={error.phoneNumber}
						/>
					</Stack>
				)}
			</DialogContent>
			<DialogActions>
				<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 3 }}>
					{activeStep > 0 && (
						<Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mr: 1 }}>
							{t('back')}
						</Button>
					)}
					<Box sx={{ flex: '1 1 auto' }} />
					<Button variant='contained' onClick={handleNext} disabled={isNextDisabled()}>
						{activeStep === steps.length - 1 ? t('createClient') : t('continue')}
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}

export default memo(CreateClientDialog);
