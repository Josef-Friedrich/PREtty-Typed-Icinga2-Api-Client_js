all: build debug

build:
	npm run build

debug:
	node --no-warnings debug.mjs