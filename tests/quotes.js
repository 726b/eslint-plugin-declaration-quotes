const rule = require("../src/rules/quotes");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
});

const ruleTester = new RuleTester();

ruleTester.run("ESLint plugin import/export declaration quotes test", rule, {
	valid: [
		{
			code: "import { Test } from 'test'",
			options: ["single"],
		},
		{
			code: "import { Test } from \"test\"",
			options: ["double"],
		},
		{
			code: "export * from 'test'",
			options: ["single"],
		},
		{
			code: "export * from \"test\"",
			options: ["double"],
		},
		{
			code: "export { Test } from 'test'",
			options: ["single"],
		},
		{
			code: "export { Test } from \"test\"",
			options: ["double"],
		},
	],
	invalid: [
		{
			code: "import { Test } from \"test\"",
			output: "import { Test } from 'test'",
			options: ["single"],
			errors: [
				{
					message: "Import/export declaration must use singlequote",
				},
			],
		},
		{
			code: "import { Test } from 'test'",
			output: "import { Test } from \"test\"",
			options: ["double"],
			errors: [
				{
					message: "Import/export declaration must use doublequote",
				},
			],
		},
		{
			code: "export * from \"test\"",
			output: "export * from 'test'",
			options: ["single"],
			errors: [
				{
					message: "Import/export declaration must use singlequote",
				},
			],
		},
		{
			code: "export * from 'test'",
			output: "export * from \"test\"",
			options: ["double"],
			errors: [
				{
					message: "Import/export declaration must use doublequote",
				},
			],
		},
		{
			code: "export { Test } from \"test\"",
			output: "export { Test } from 'test'",
			options: ["single"],
			errors: [
				{
					message: "Import/export declaration must use singlequote",
				},
			],
		},
		{
			code: "export { Test } from 'test'",
			output: "export { Test } from \"test\"",
			options: ["double"],
			errors: [
				{
					message: "Import/export declaration must use doublequote",
				},
			],
		},
	],
});