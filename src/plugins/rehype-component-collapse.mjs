/// <reference types="mdast" />
import { h } from "hastscript";

function toText(node) {
	if (!node) return "";
	if (node.type === "text") return node.value || "";
	if (!Array.isArray(node.children)) return "";
	return node.children.map(toText).join("");
}

/**
 * Creates a collapsible details block for Markdown directives.
 *
 * Usage:
 * :::collapse[Title]
 * Content
 * :::
 *
 * @param {Object} properties - The directive properties.
 * @param {import('mdast').RootContent[]} children - The directive children.
 * @returns {import('mdast').Parent} The created collapse component.
 */
export function CollapseComponent(properties, children) {
	if (!Array.isArray(children) || children.length === 0) {
		return h(
			"div",
			{ class: "hidden" },
			'Invalid collapse directive. Use block syntax like ":::collapse[Title] <content> :::"',
		);
	}

	let title = properties?.title || properties?.name || "Details";
	let contentChildren = children;
	if (properties?.["has-directive-label"]) {
		title = toText(children[0]).trim() || title;
		contentChildren = children.slice(1);
	}

	return h("details", { class: "md-collapse" }, [
		h("summary", { class: "md-collapse-summary" }, [
			h("span", { class: "collapse-title" }, title),
			h("span", { class: "collapse-indicator", "aria-hidden": "true" }, ""),
		]),
		h("div", { class: "md-collapse-content" }, contentChildren),
	]);
}
