# ts-gphoto2-driver

[![Build Status](https://travis-ci.org/TypedProject/ts-gphoto2-driver.svg?branch=master)](https://travis-ci.org/TypedProject/ts-gphoto2-driver)
[![Coverage Status](https://coveralls.io/repos/github/TypedProject/ts-gphoto2-driver/badge.svg?branch=master)](https://coveralls.io/github/TypedProject/ts-gphoto2-driver?branch=master)
![npm](https://img.shields.io/npm/dm/%40typedproject%2Fgphoto2-driver.svg)
[![npm version](https://badge.fury.io/js/%40typedproject%2Fgphoto2-driver.svg)](https://badge.fury.io/js/%40typedproject%2Fgphoto2-driver)
[![Dependencies](https://david-dm.org/typedproject/ts-gphoto2-driver.svg)](https://david-dm.org/typedproject/ts-gphoto2-driver#info=dependencies)
[![img](https://david-dm.org/typedproject/ts-gphoto2-driver/dev-status.svg)](https://david-dm.org/typedproject/ts-gphoto2-driver/#info=devDependencies)
[![img](https://david-dm.org/typedproject/ts-gphoto2-driver/peer-status.svg)](https://david-dm.org/typedproject/ts-gphoto2-driver/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/typedproject/ts-gphoto2-driver/badge.svg)](https://snyk.io/test/github/typedproject/ts-gphoto2-driver)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> This project is under Alpha version.

A Node.js wrapper for libgphoto2 written in TypeScript. Useful for remote controlling of DSLRs and other digital cameras supported by gphoto2.

## Features

 - Camera autodetection,
 - Take a picture/movie capture,
 - Take a preview,
 - Retrieve camera list,
 - Select camera,
 - Take a liveview from camera and get binary or base64 of each frame, or write it to file,
 - Display info about your camera (summary, about, manual).

## Prerequisite

 - Node.js: any version supported by nodejs/nan
 - NPM: ~5.6.0
 - Nan: ~2.8.0
 - libgphoto2: ~2.5.x - via `brew install libgphoto2`, `apt-get install libgphoto2-dev` or download and build from `http://www.gphoto.org/proj/libgphoto2/`,
 - pkg-config | dpkg (used for dependency checking)
 - clang compiler

> Note: This package cannot be used in front-end context (like webpack, browserify, etc...). You have to develop your own web server and expose your API.

## Installation

After installing the dependencies, just install using:

```bash
npm install @typedproject/gphoto2-driver
```

## Usage

Here an example with TypeScript (works also with pure javascript in Node.js):

```typescript
import * as Path from "path";
import { CameraList, closeQuietly } from "@typedproject/gphoto2-driver";

const cameraList = new CameraList().load();

console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  const camera = cameraList.getCamera(0);
  console.log('Camera =>', camera);

  const cameraFile = camera.captureImage();

  cameraFile.save(path.join(__dirname, 'capture.jpeg'));

  closeQuietly(cameraFile);
  closeQuietly(camera);
}

cameraList.close();
```

## Examples

Some example are available in the examples directory, when you have cloned or downloaded the complete project from github.

Checkout this project then run `npm run develop` and run `node examples/camera.js`.

## Contribute

Contributors and PR are welcome. Before, just read [contributing guidelines here](./CONTRIBUTING.md) ;)

## License

The MIT License (MIT)

Copyright (c) 2016 - 2018 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis]: https://travis-ci.org/

