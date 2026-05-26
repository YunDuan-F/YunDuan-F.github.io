export interface MarkdownLinkCard {
	name: string;
	description: string;
	url: string;
	avatar?: string;
}

export interface MarkdownLinkCardPage {
	title: string;
	description: string;
	cards: MarkdownLinkCard[];
}

const stripMarkdownLink = (value: string) => {
	const match = value.match(/^\[([^\]]+)\]\([^)]+\)$/);
	return match ? match[1] : value;
};

const splitTableRow = (line: string) => {
	return line
		.trim()
		.replace(/^\|/, "")
		.replace(/\|$/, "")
		.split("|")
		.map((cell) => cell.trim());
};

const isSeparatorRow = (line: string) => {
	return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
};

export function parseMarkdownLinkCardPage(
	body: string,
	fallbackTitle: string,
	fallbackDescription: string,
): MarkdownLinkCardPage {
	const lines = body.split(/\r?\n/);
	const title =
		lines.find((line) => line.startsWith("# "))?.replace(/^#\s+/, "").trim() ||
		fallbackTitle;

	const tableHeaderIndex = lines.findIndex((line, index) => {
		if (!line.includes("|") || !lines[index + 1]) return false;
		const headers = splitTableRow(line).map((cell) => cell.toLowerCase());
		return (
			headers.includes("name") &&
			headers.includes("description") &&
			headers.includes("url") &&
			isSeparatorRow(lines[index + 1])
		);
	});

	const descriptionLines =
		tableHeaderIndex === -1 ? lines : lines.slice(0, tableHeaderIndex);
	const description =
		descriptionLines
			.map((line) => line.trim())
			.find((line) => line && !line.startsWith("#")) || fallbackDescription;

	if (tableHeaderIndex === -1) {
		return { title, description, cards: [] };
	}

	const headers = splitTableRow(lines[tableHeaderIndex]).map((cell) =>
		cell.toLowerCase(),
	);
	const nameIndex = headers.indexOf("name");
	const descriptionIndex = headers.indexOf("description");
	const urlIndex = headers.indexOf("url");
	const avatarIndex = headers.indexOf("avatar");

	const cards: MarkdownLinkCard[] = [];
	for (const line of lines.slice(tableHeaderIndex + 2)) {
		if (!line.trim().startsWith("|")) break;
		const cells = splitTableRow(line);
		const name = cells[nameIndex];
		const cardDescription = cells[descriptionIndex];
		const url = cells[urlIndex];
		const avatar = avatarIndex === -1 ? "" : cells[avatarIndex];
		if (!name || !url) continue;
		cards.push({
			name: stripMarkdownLink(name),
			description: cardDescription || "",
			url,
			avatar: avatar || undefined,
		});
	}

	return { title, description, cards };
}
