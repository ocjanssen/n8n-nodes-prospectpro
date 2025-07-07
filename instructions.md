# n8n ProspectPro Node - Installation

## If switching from pnpm (first time only):
```bash
rm -f pnpm-lock.yaml package-lock.json
rm -rf .pnpm-store node_modules dist/
```

## Install & Run:
```bash
./run.sh
```

That's it! Open http://localhost:5679 to use your ProspectPro node.

## Making changes:
```bash
./run.sh
```
(The script rebuilds and restarts automatically)

## Publishing:
Once repo is transferred to you:
```bash
npm login
npm publish
``` 