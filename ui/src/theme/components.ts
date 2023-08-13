import { Theme } from '@mui/material';

const components = {
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: ({ theme }: { theme: Theme }) => ({
					borderRadius: 6,
					textTransform: 'none' as const,
					padding: theme.spacing(1, 3),
				}),
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: ({ theme }: { theme: Theme }) => ({
					backgroundColor: '#FFFFFF',
					'label + &': {
						marginTop: theme.spacing(3),
					},
					'& input::placeholder': {
						fontSize: theme.typography.body2.fontSize,
					},
				}),
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					transform: 'translate(0, 0) scale(0.75)',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }: { theme: Theme }) => ({
					'& fieldset': {
						borderColor: theme.palette.grey[300],
					},
					borderRadius: 6,
				}),
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					'&.Mui-completed': {
						color: '#008025',
					},
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 6,
				},
			},
		},
	},
};

export default components;
