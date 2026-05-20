import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "YunDuan-F",
	subtitle: "Personal Blog",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		// EDIT HERE: site theme color hue. It is fixed at 230 and visitors cannot change it.
		hue: 230,
		fixed: true,
	},
	banner: {
		enable: true,
		// EDIT HERE: light mode banner image.
		src: "assets/images/background/white.jpg",
		// EDIT HERE: dark mode banner image. Leave empty or remove this line to reuse src.
		darkSrc: "assets/images/background/black.jpg",
		// EDIT HERE: image crop position. Supports "top", "center", or "bottom".
		position: "center",
		credit: {
			enable: false,
			// EDIT HERE: banner image credit text, if credit.enable is true.
			text: "",
			// EDIT HERE: optional credit link, if credit.enable is true.
			url: "",
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/YunDuan-F", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "YunDuan-F",
	bio: "记录技术、想法与工具。",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/YunDuan-F",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// EDIT HERE: syntax highlighting themes for Markdown code blocks.
	lightTheme: "github-light",
	darkTheme: "github-dark",
};
