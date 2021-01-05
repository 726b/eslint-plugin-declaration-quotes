# eslint-plugin-declaration-quotes

For those of us who use backticks as default quotes, this plugin will enforce consistent use of single or double quotes for import/export declarations.

## Options

This rule has two possible options:

* `"single"` (default) requires the use of single quotes
* `"double"` requires the use of double quotes

## How to use

To enforce single quotes in import/export declarations:

```jsonc
"declaration-quotes/quotes": ["error", "single"]
```

To enforce double quotes in import/export declarations:

```jsonc
"declaration-quotes/quotes": ["error", "double"]
```
