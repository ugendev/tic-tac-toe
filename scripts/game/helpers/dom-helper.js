export function getChildIndex(parent, child) {
	return Array.prototype.indexOf.call(parent.children, child);
}

export function show(target) {
	target.classList.remove("hidden");
}

export function hide(target) {
	target.classList.add("hidden");
}