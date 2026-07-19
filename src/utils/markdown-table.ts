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

export interface MarkdownLinkCardSection {
	title: string;
	description: string;
	cards: MarkdownLinkCard[];
}

export interface MarkdownLinkCardSectionsPage {
	title: string;
	description: string;
	sections: MarkdownLinkCardSection[];
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
		lines
			.find((line) => line.startsWith("# "))
			?.replace(/^#\s+/, "")
			.trim() || fallbackTitle;

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

export function parseMarkdownLinkCardSections(
	body: string,
	fallbackTitle: string,
	fallbackDescription: string,
): MarkdownLinkCardSectionsPage {
	const lines = body.split(/\r?\n/);
	const title =
		lines
			.find((line) => line.startsWith("# "))
			?.replace(/^#\s+/, "")
			.trim() || fallbackTitle;

	const firstTableIndex = lines.findIndex((line, index) => {
		if (!line.includes("|") || !lines[index + 1]) return false;
		const headers = splitTableRow(line).map((cell) => cell.toLowerCase());
		return (
			headers.includes("name") &&
			headers.includes("description") &&
			headers.includes("url") &&
			isSeparatorRow(lines[index + 1])
		);
	});
	const description =
		lines
			.slice(0, firstTableIndex === -1 ? lines.length : firstTableIndex)
			.map((line) => line.trim())
			.find((line) => line && !line.startsWith("#")) || fallbackDescription;

	const sections: MarkdownLinkCardSection[] = [];
	for (let index = 0; index < lines.length - 1; index++) {
		const line = lines[index];
		if (!line.includes("|") || !isSeparatorRow(lines[index + 1])) continue;

		const headers = splitTableRow(line).map((cell) => cell.toLowerCase());
		const nameIndex = headers.indexOf("name");
		const descriptionIndex = headers.indexOf("description");
		const urlIndex = headers.indexOf("url");
		const avatarIndex = headers.indexOf("avatar");
		if (nameIndex === -1 || descriptionIndex === -1 || urlIndex === -1)
			continue;

		let sectionHeadingIndex = index - 1;
		while (
			sectionHeadingIndex >= 0 &&
			!lines[sectionHeadingIndex].startsWith("## ")
		) {
			sectionHeadingIndex--;
		}
		const sectionTitle =
			sectionHeadingIndex >= 0
				? lines[sectionHeadingIndex].replace(/^##\s+/, "").trim()
				: fallbackTitle;
		const sectionDescription =
			lines
				.slice(sectionHeadingIndex + 1, index)
				.map((value) => value.trim())
				.find((value) => value && !value.startsWith("<!--")) || "";

		const cards: MarkdownLinkCard[] = [];
		let rowIndex = index + 2;
		while (rowIndex < lines.length && lines[rowIndex].trim().startsWith("|")) {
			const cells = splitTableRow(lines[rowIndex]);
			const name = cells[nameIndex];
			const url = cells[urlIndex];
			if (name && url) {
				cards.push({
					name: stripMarkdownLink(name),
					description: cells[descriptionIndex] || "",
					url,
					avatar:
						avatarIndex === -1 ? undefined : cells[avatarIndex] || undefined,
				});
			}
			rowIndex++;
		}

		sections.push({
			title: sectionTitle,
			description: sectionDescription,
			cards,
		});
		index = rowIndex - 1;
	}

	return { title, description, sections };
}
