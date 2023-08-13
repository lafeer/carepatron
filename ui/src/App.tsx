import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import DataProvider from './store/DataProvider';
import Clients from './pages/Clients';
import theme from './theme';

export default function App() {
	return (
		<div className='App'>
			<ThemeProvider theme={createTheme(theme)}>
				<DataProvider>
					<Routes>
						<Route path='/' element={<Clients />} />
						<Route path='/Clients' element={<Clients />} />
					</Routes>
				</DataProvider>
			</ThemeProvider>
		</div>
	);
}
