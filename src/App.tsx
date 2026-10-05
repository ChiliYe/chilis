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
					</ul>
				</nav>
			</header>
			<main id="explore">
				<div className="prod-box">
					<div className="prod-title">
						幻想音点 · fanMdot
					</div>
					<span className="prod-description">
						幻想音点是chilis团队的第一款节奏游戏，特点是五条轨道以及全屏判定
					</span>
					<br />
					<a
						href="https://github.com/ChiliYe/fantasy-music-dots"
						className="prod-description"
					>
						仓库链接
					</a>
					<br />
					<span className="prod-description-footer">
						目前正在技术栈迁移阶段
					</span>
				</div>
				<div className="prod-box">
					<div className="prod-title">
						万向和乐 · WxR
					</div>
					<span className="prod-description">
						万向和乐是chilis团队的第二款节奏游戏，以低难度著称
					</span>
					<br />
					<span className="prod-description-footer">
						目前正在策划阶段
					</span>
				</div>
				<div className="prod-box">
					<div className="prod-title">
						rcrt-framework
					</div>
					<span className="prod-description">
						rcrt-framework是chilis团队开发的框架，用于支持2D游戏的开发
					</span>
					<br />
					<a
						href="https://github.com/ChiliYe/rcrt-framework"
						className="prod-description"
					>
						仓库链接
					</a>
					<br />
					<span className="prod-description-footer">
						目前正在开发起步阶段
					</span>
				</div>
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
