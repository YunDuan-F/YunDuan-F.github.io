/**
 * Based on the discussion at https://github.com/expressive-code/expressive-code/issues/153#issuecomment-2282218684
 */
import { definePlugin } from "@expressive-code/core";

export function pluginLanguageBadge() {
	return definePlugin({
		name: "Language Badge",
		// @ts-expect-error
		baseStyles: ({ _cssVar }) => `
      [data-language]::before {
        position: absolute;
        z-index: 3;
        left: 5.3rem;
        top: 0.92rem;
        content: attr(data-language);
        font-family: Roboto, ui-sans-serif, system-ui, sans-serif;
        font-size: 0.88rem;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0;
        text-transform: uppercase;
        color: var(--codeblock-title);
        background: transparent;
        pointer-events: none;
        opacity: 1;
      }
    `,
	});
}
