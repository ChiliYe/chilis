/** @format */

// import React, { useState } from "react";
import "./style.scss";

function App() {
	// const [isExploring, setIsExploring] = useState(false);

	// const handleExplore = () => {
	// 	setIsExploring(true);
	// 	document
	// 		.querySelector("#explore")
	// 		?.scrollIntoView({ behavior: "smooth" });
	// };

	return (
		<div className="App">
			<header className="App-header">
				{/* 顶栏包括logo和导航 */}
				<h1>Welcome to My App</h1>
			</header>
			<main id="explore">
				<p>This is the explore section.</p>
			</main>
		</div>
	);
}

export default App;
