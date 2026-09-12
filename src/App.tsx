/** @format */

import { useState } from "react";
import logo from "./assets/logo.svg";
import "./style.scss";

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<div className="App">
			<header className="App-header">
				<a
					className="App-logo-link"
					href="#explore"
					aria-label="Home"
				>
					<img
						src={logo}
						className="App-logo"
						alt="Chilis logo"
					/>
				</a>
				<button
					className="App-menu-toggle"
					type="button"
					aria-label={
						isMenuOpen
							? "Close menu"
							: "Open menu"
					}
					aria-expanded={isMenuOpen}
					aria-controls="main-navigation"
					onClick={() =>
						setIsMenuOpen((isOpen) => !isOpen)
					}
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						focusable="false"
					>
						<path d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<nav
					id="main-navigation"
					className={`App-nav${isMenuOpen ? " is-open" : ""}`}
					aria-label="Main navigation"
				>
					<ul>
						<li>
							<a
								href="#explore"
								onClick={closeMenu}
							>
								Explore
							</a>
						</li>
						<li>
							<a
								href="#about"
								onClick={closeMenu}
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#contact"
								onClick={closeMenu}
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</header>
			<main id="explore">
				<p>敬请期待……</p>
			</main>
			<footer id="about">
				<span>© 2026 Chilis</span>
				<a href="mailto:3388615157@qq.com">
					<span>Contact us</span>
				</a>
				<span>. All rights reserved.</span>
			</footer>
		</div>
	);
}

export default App;
