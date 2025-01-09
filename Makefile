install:
		npm ci
lint:
		npx eslint .
test:
		npm test
watch:
		npx jest --watch