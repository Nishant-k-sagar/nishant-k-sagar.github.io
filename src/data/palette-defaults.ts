export const PALETTE_DEFAULTS = {
	bgHue: 156,
	bgSat: 50,
	lightBg: 96,
	darkBg: 8,
	accentHue: 156,
	accentSat: 65,
	inkHue: 156,
	inkSat: 8,
	bgStyle: 'off',
};

export const PALETTE_PRESETS = [
	{ name: 'Mint', bgHue: 156, bgSat: 50, lightBg: 96, darkBg: 8, accentHue: 156, accentSat: 65, inkHue: 156, inkSat: 8, bgStyle: 'off' },
	{ name: 'Sand', bgHue: 36, bgSat: 32, lightBg: 94, darkBg: 9, accentHue: 28, accentSat: 62, inkHue: 36, inkSat: 9, bgStyle: 'off' },
	{ name: 'Ember', bgHue: 15, bgSat: 26, lightBg: 93, darkBg: 10, accentHue: 12, accentSat: 78, inkHue: 15, inkSat: 9, bgStyle: 'off' },
	{ name: 'Lavender', bgHue: 268, bgSat: 22, lightBg: 95, darkBg: 10, accentHue: 265, accentSat: 58, inkHue: 268, inkSat: 9, bgStyle: 'off' },
	{ name: 'Ocean', bgHue: 200, bgSat: 40, lightBg: 96, darkBg: 7, accentHue: 198, accentSat: 74, inkHue: 200, inkSat: 8, bgStyle: 'off' },
	{ name: 'Bloom', bgHue: 340, bgSat: 22, lightBg: 95, darkBg: 8, accentHue: 340, accentSat: 64, inkHue: 340, inkSat: 8, bgStyle: 'off' },
	{ name: 'Slate', bgHue: 220, bgSat: 16, lightBg: 96, darkBg: 8, accentHue: 220, accentSat: 56, inkHue: 220, inkSat: 8, bgStyle: 'off' },
	{ name: 'Graphite', bgHue: 240, bgSat: 8, lightBg: 96, darkBg: 7, accentHue: 240, accentSat: 38, inkHue: 240, inkSat: 6, bgStyle: 'off' },
];

export const PALETTE_CONTROLS = [
	{ key: "bgHue", label: "Background hue", role: "bg-hue", min: 0, max: 360, value: PALETTE_DEFAULTS.bgHue, suffix: "°", output: "156°" },
	{ key: "bgSat", label: "Background saturation", role: "bg-sat", min: 0, max: 70, value: PALETTE_DEFAULTS.bgSat, suffix: "%", output: "50%" },
	{ key: "lightBg", label: "Light brightness", role: "light-bg", min: 68, max: 97, value: PALETTE_DEFAULTS.lightBg, suffix: "", output: "96" },
	{ key: "darkBg", label: "Dark depth", role: "dark-bg", min: 4, max: 22, value: PALETTE_DEFAULTS.darkBg, suffix: "", output: "8" },
	{ key: "accentHue", label: "Accent hue", role: "accent-hue", min: 0, max: 360, value: PALETTE_DEFAULTS.accentHue, suffix: "°", output: "156°" },
	{ key: "accentSat", label: "Accent saturation", role: "accent-sat", min: 20, max: 85, value: PALETTE_DEFAULTS.accentSat, suffix: "%", output: "65%" },
	{ key: "inkHue", label: "Font hue", role: "ink-hue", min: 0, max: 360, value: PALETTE_DEFAULTS.inkHue, suffix: "°", output: "156°" },
	{ key: "inkSat", label: "Font tint", role: "ink-sat", min: 0, max: 18, value: PALETTE_DEFAULTS.inkSat, suffix: "%", output: "8%" },
];
