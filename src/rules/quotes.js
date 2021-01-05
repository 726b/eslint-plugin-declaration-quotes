function convert(str) {
	return str.replace(new RegExp(this.alternateQuote, "g"), this.quote);
}

const QUOTE_SETTINGS = {
	double: {
		quote: "\"",
		alternateQuote: "'",
		description: "doublequote",
		convert: convert,
	},
	single: {
		quote: "'",
		alternateQuote: "\"",
		description: "singlequote",
		convert: convert,
	},
};

module.exports = {
	meta: {
		type: "layout",

		docs: {
			description: "Enforce consistent use of quotes for import/export declarations",
			category: "Stylistic Issues",
			recommended: false,
		},

		fixable: "code",

		schema: [
			{
				enum: ["single", "double"],
			},
		],
	},

	create(context) {
		const settings = QUOTE_SETTINGS[context.options[0] || "single"];

		function isSurroundedBy(val, character) {
			return val[0] === character && val[val.length - 1] === character;
		}

		function checkDeclaration(node) {
			if (node && node.source && node.source.raw) {
				const src = context.getSourceCode().getText(node);
				const raw = node.source.raw;

				let isValid = isSurroundedBy(raw, settings.quote);

				if (!isValid) {
					isValid = isSurroundedBy(raw, settings.alternateQuote) && raw.indexOf(settings.quote) >= 0;
				}

				if (!isValid) {
					context.report({
						node: node,
						message: "Import/export declaration must use " + settings.description,
						fix(fixer) {
							return fixer.replaceText(node, settings.convert(src));
						},
					});
				}
			}
		}

		return {
			ImportDeclaration: checkDeclaration,
			ExportAllDeclaration: checkDeclaration,
			ExportNamedDeclaration: checkDeclaration,
		};
	},
};
