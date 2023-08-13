import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { OverridableStringUnion } from '@mui/types';

interface TextFieldProps {
	label: string;
	name: string;
	size?: OverridableStringUnion<'small' | 'medium'>;
	error?: boolean;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({ label, name, size = 'small', error, value, onChange }: TextFieldProps) {
	return (
		<FormControl variant='outlined' required fullWidth error={error}>
			<InputLabel shrink htmlFor={name}>
				{label}
			</InputLabel>
			<OutlinedInput id={name} name={name} size={size} value={value} onChange={onChange} />
		</FormControl>
	);
}
