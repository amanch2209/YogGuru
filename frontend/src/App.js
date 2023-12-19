// Filename - App.js

import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./components/Home";
import Checkout from "./components/Checkout";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						exact
						path="/checkout"
						element={<Checkout />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
