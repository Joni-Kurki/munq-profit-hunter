import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { MoMLandView } from './components/MoMLandView';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomeView } from './HomeView';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Router>
				<Container>
					<Routes>
						<Route path="/" element={<HomeView />} />
						<Route path="/mom" element={<MoMLandView />} />
					</Routes>
				</Container>
			</Router>
		</ThemeProvider>
	);
}

export default App;
