# Contributing

Install the development dependencies with `npm install`, then run the tests from the repository root with:

```sh
npm test
```

`npm test` runs the Node.js test runner over the files in `test/`. Check the code with `npm run lint`.

## Opening a pull request

Fork the repository (or create a branch in it if you have write access) and clone it. Then make your change on a new branch:

```sh
git checkout -b my-change
git add .
git commit -m "Describe the change"
git push origin my-change
```

Open a pull request against `main` from the repository's GitHub page. Describe what the change does and why, and check that `npm test` and `npm run lint` pass before you open it.
