export function Button({ children, className }) {
	// console.log(children);
	// console.log(className);
	return `<button class="${className}">${children}</button>`;
}
