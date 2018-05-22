# carousel-bbdo
Exercise application for BBDO

Simple base app with react, hot-reload &amp; sass.

`npm install` to install the all needed node modules.

## How to install

Make sure you have Node installed in your machine. To confirm:
`npm -v` or `node -v`

If you just freshly installed npm you are good to go, else you might need to upgrade
```
npm install -g n
```
and now you have the latest stable version of node&npm.

To start dev server in localhost:3000, run `npm start`

`npm run build` to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.


`npm test` run the tests with Jest and Enzyme, by default the test included only check for the correct render of base components & routes, all are passing.
