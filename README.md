# devboxes-integration-fixture

## Sum page

Open `index.html` in a browser and type two numbers; the sum updates as you type.
An empty field counts as zero.

To check the page in a headless browser, install the dependencies and run the
browser check:

```sh
npm install
npx playwright install chromium
npm run check:page
```
