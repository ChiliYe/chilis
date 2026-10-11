/** @format */

import "./LineMenu.scss";

export interface LineMenuItemData {
	href: string;
	label: string;
	onClick: () => void;
}

interface LineMenuProps {
	isOpen: boolean;
	items: LineMenuItemData[];
}

function LineMenuItem({ href, label, onClick }: LineMenuItemData) {
	return (
		<li>
			<a href={href} onClick={onClick}>
				{label}
			</a>
		</li>
	);
}

export default function LineMenu({ isOpen, items }: LineMenuProps) {
	return (
		<nav
			id="main-navigation"
			className={`App-nav${isOpen ? " is-open" : ""}`}
			aria-label="Main navigation"
		>
			<ul>
				{items.map((item) => (
					<LineMenuItem key={item.href} {...item} />
				))}
			</ul>
		</nav>
	);
}
