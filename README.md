# Cloudflare Workers for GitHub Linguist

The GitHub Linguist API build on top of Cloudflare Workers, retrieves language metadata from GitHub repositories.

## How it works

https://github.com/github-linguist/linguist/blob/master/docs/how-linguist-works.md

## Usage

Enter a valid `$LANGUAGE` as params

```bash
curl https://cw-github-linguist.indiehacker.workers.dev/?language=$LANGUAGE
```

## Example

### Input

```bash
curl https://cw-github-linguist.indiehacker.workers.dev/?language=TypeScript
```

### Output

```json
{
	"type": "programming",
	"color": "#3178c6",
	"aliases": ["ts"],
	"interpreters": ["deno", "ts-node", "tsx"],
	"extensions": [".ts", ".cts", ".mts"],
	"tm_scope": "source.ts",
	"ace_mode": "typescript",
	"codemirror_mode": "javascript",
	"codemirror_mime_type": "application/typescript",
	"language_id": 378
}
```

## License

MIT [xiaoluoboding](https://github.com/xiaoluoboding)
