/** @format */

import React from "react";
import "./Introduction.scss";

interface IntroductionProps {
	title: string;
	status: string;

	children?: React.ReactNode;
}

export default function Introduction({
	title,
	status,
	children,
}: IntroductionProps) {
	return (
		<>
			<div className="prod-title">{title}</div>
			{children}
			<br />
			<span className="prod-description-footer">
				{status}
			</span>
		</>
	);
}
