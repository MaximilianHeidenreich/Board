<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPLv3 License][license-shield]][license-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/MaximilianHeidenreich/Board?style=flat-square
[forks-url]: https://github.com/MaximilianHeidenreich/Board/network
[stars-shield]: https://img.shields.io/github/stars/MaximilianHeidenreich/Board?style=flat-square
[stars-url]: https://github.com/MaximilianHeidenreich/Board/stargazers
[issues-shield]: https://img.shields.io/github/issues/MaximilianHeidenreich/Board?style=flat-square
[issues-url]: https://github.com/MaximilianHeidenreich/Board/issues
[license-shield]: https://img.shields.io/github/license/MaximilianHeidenreich/Board?style=flat-square
[license-url]: https://github.com/MaximilianHeidenreich/Board/blob/master/LICENSE

<!-- PROJECT HEADER -->
<br />
<p align="center">
  <a href="https://github.com/MaximilianHeidenreich/Board">
    <img width="300" src="https://github.com/MaximilianHeidenreich/Brief/blob/dbe448fbc8272ec96fdde3dad738cede3ae46d4b/static/brief_banner.png?raw=true" alt="Project Logo" >
  </a>

  <p align="center">
    <small>
        \ ˈbrēf \ - <em>short in duration, extent or length</em>
        <br />
        Board - <em>minimalisitc app with powerful features to build beautiful moodboards.</em>
    </small>
    <br />
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <a href="#">Download now</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Brief/issues">Report Bug</a>
    ·
    <a href="https://github.com/MaximilianHeidenreich/Brief/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [Table of Contents](#table-of-contents)
-   [About The Project](#about-the-project)
    -   [Features](#features)
-   [Usage](#usage)
    -   [Web](#web)
    -   [API](#api)
    -   [Dev](#dev)
-   [Contributing](#contributing)
-   [Contact](#contact)
-   [Licenses](#licenses)

<!-- ABOUT THE PROJECT -->

## About The Project

Have you ever felt the need to send a brief message to someone but not through those unpersonal messager apps? Brief has you covered!

With Brief you can send short messages (_30 chars max._) to other people.

<br />

### Features

-   [x] Core
    -   [x] Create moodboards
    -   [ ] Supports many different media types
        -   [ ] Images
        -   [ ] Videos
        -   [ ] Text
        -   [ ] URL's
    -   [ ] Export
        -   [ ] to PNG/JPEG
        -   [ ] to PDF
-   [x] Premium
    -   [ ] Unlimited cloud backups
    -   [ ] Remote collaboration
    -   [ ] Export
        -   [ ] to Website

<br>

<!-- CONTRIBUTING -->

## Contributing

Feel free to contribute to this project if you find something that is missing or can be optimized.
If you do so, please follow the following steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br />

<!-- CONTACT -->

## Contact

Maximilian Heidenreich - github@maximilian-heidenreich.de

Project Link: [https://github.com/MaximilianHeidenreich/Board](https://github.com/MaximilianHeidenreich/Board)

Project Banner: [https://github.com/MaximilianHeidenreich/Board/blob/master/static/brief_banner.png](https://github.com/MaximilianHeidenreich/Board/blob/master/static/brief_banner.png)

<br />

<!-- LICENSE -->

## Licenses

The project uses Twemoji for its favicon and banner image.

“[Twemoji](https://twemoji.twitter.com)” by [Twitter OSS](https://twitter.com/TwitterOSS) is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

# TODO:

https://blog.avocode.com/4-must-know-tips-for-building-cross-platform-electron-apps-f3ae9c2bffff

-   Auto updater -> probably custom package
-   WYSIWYG -> https://svelte.dev/tutorial/tick

## Features

### Core

-   Boards
    -   Grid View
    -   Map View
-   Import media types
    -   Import into assets folder / Link external
    -   Images
    -   Videos
    -   Text
    -   Websites
    -   Auto copy images from clipboard (ask)
-   Export
    -   Image (PNG/JPEG)
    -   PDF

### Premium

-   Cloud backup
-   Remote collaboration
-   Export
    -   Web

## Logging

-   https://github.com/adamschwartz/log/blob/master/log.js
-   https://github.com/debug-js/debug
-   Pass to mainIPC and writeFile
-   Wrpper arround common llib?

### Menubr

-   Default mode always grid
-   grey out map viewmode, when enabled gets saved, icon normal color
-   lock mode

### Media types

-   URL (With optional preview?)
-   Image
-   Video (& GIFS)
-

### Media sources

-   File select
-   Drag and drop into window
-   Screenshot
-   URL embedd
-   URL download
-   CTRL-C/-V

### Grid view

https://blog.stackfindover.com/masonry-grid-examples/
https://codepen.io/kattixie/pen/bEYyZb

### Map view

https://github.com/rozek/svelte-drag-and-drop-actions

### Comments

-   svelte:self https://www.youtube.com/watch?v=0rKBt4PSfew&list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR&index=68 recursion

### Synchronization

https://docs.deta.sh/docs/home/

-   Github
-   Google drive
-   OneDrive?

### Export

-   Extra export window
-   Showing only board grid

# ⚡ Vite + TypeScript + Svelte + Electron

Special thanks to [jctaoo](https://github.com/jctaoo) for his original template [vite-electron-esbuild-starter](https://github.com/jctaoo/vite-electron-esbuild-starter).

The electron project stater using vite for renderer process and esbuild / tsc for main process.

Uses [Svelte](https://svelte.dev/) as the framework for render.

Note: CSC_IDENTITY_AUTO_DISCOVERY is set to false by default to avoid the codesign operation in packaging macos (learn more: [codesign](https://www.electron.build/code-signing))

## Usage

Create a Project:

-   Clone this project directly.
-   If you use GitHub, click Use this template at the top of the page or [here](https://github.com/vanjmali/vite-typescript-svelte-electron/generate) (do not check include all branch)

Installation dependencies

```shell
npm i
```

Start local development

```shell
# Use esbuild to compile the main process Typescript and run the application
npm run dev
```

Compile/Pack

```shell
# Only build the target code and resources of the main process and the rendering process, without packaging (exe, dmg, etc.)
npm run build

# Preview your application in production mode without pack.
npm run preview

# Build and pack as a runnable program or installer
npm run pack:win
npm run pack:mac
npm run pack:linux

# Pack for all platforms
npm run pack # Exclude mac platform, applicable to linux & win
npm run pack:all
```

Clean up the build directory

```shell
npm run clean
```

## File structure

Use [two-package-structure](https://www.electron.build/tutorials/two-package-structure)

```

app/                   Electron-Builder app directory and its build directory
├─ package.json        Production dependencies, all stored as dependencies (not devDependencies)
dist/                  Electron-Builder package directory
scripts/               Support scripts for development/build.
src/
├─ common/             Common code
├─ main/               for main process
├─ renderer/           For renderer process
package.json           Dependencies during development, all stored as devDependencies (not dependencies)
vite.config.ts         Vite configurations
electron-builder.yml   Electron-Builder configurations

```
