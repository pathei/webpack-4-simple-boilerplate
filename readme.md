# Webpack boilerplate

Webpack boilerplate without frameworks and bloated addons to kick off vanilla JS/SCSS projects.

### Usage:

- **npm install** for setting up
- **npm run dev** for development
- **npm run build** for production

### Features:

- Hot reload JS/CSS/SCSS
- Vendor prefixes for CSS by Postcss-loader
- Minifying/uglifying JS and CSS
- Babel for JS ES6 transpiling
- Pathsetting during build for e.g. images
- Transfer assets to dist folder
- Font loading
- JS linting Airbnb
- Image compression on build
- Removing unused CSS
- Favicon generation

### Plugins used:

**HtmlWebPackPlugin**: generates a HTML5 file for you that includes all your webpack bundles in the body using script tags.

**MiniCssExtractPlugin**: extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

**TerserPlugin/OptimizeCSSAssetsPlugin**: uglifies and minifies CSS/JS.

**Postcss-loader**: handles vendor prefixing css.

**CopyWebpackPlugin**: copies the assets folder (images/fonts) to the dist folder druing build.

**File-loader**: loads and includes local fonts.

**CleanWebpackPlugin**: removes/cleans up build folder(s) before building.

**ESlint/babel-eslint airbnb-base**: JS codelinting based on airbnb-base. Enhanced with custom rules to overwrite some airbnb-base rules ( personal taste ).

**ImageminPlugin**: optimizes images during build process.

**PurifyCSSPlugin**: removes unused selectors from your CSS on build.

**FaviconsWebpackPlugin**: generates favicons for a broad range of devices and injects them by HtmlWebPackPlugin into the HTML.

**ProgressBarPlugin**: simplifies readability of webpack status.
