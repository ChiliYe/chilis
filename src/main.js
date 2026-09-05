/** @format */

import "./style.css";

const action = document.querySelector(".action");

action?.addEventListener("click", () => {
	document
		.querySelector("#explore")
		?.scrollIntoView({ behavior: "smooth" });
});
