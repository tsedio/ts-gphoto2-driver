# @tsed/gphoto2-core

[![Build & Release](https://github.com/tsedio/ts-gphoto2-driver/actions/workflows/build.yml/badge.svg)](https://github.com/tsedio/ts-gphoto2-driver/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/tsedio/ts-gphoto2-driver/badge.svg?branch=production)](https://coveralls.io/github/tsedio/ts-gphoto2-driver?branch=production)
![npm](https://img.shields.io/npm/dm/%40tsed%2Fgphoto2-core.svg)
[![npm version](https://badge.fury.io/js/%40tsed%2Fgphoto2-core.svg)](https://badge.fury.io/js/%tsed%2Fgphoto2-core)
[![Dependencies](https://david-dm.org/tsedio/ts-gphoto2-driver.svg)](https://david-dm.org/tsedio/ts-gphoto2-driver#info=dependencies)
[![img](https://david-dm.org/tsedio/ts-gphoto2-driver/dev-status.svg)](https://david-dm.org/tsedio/ts-gphoto2-driver/#info=devDependencies)
[![img](https://david-dm.org/tsedio/ts-gphoto2-driver/peer-status.svg)](https://david-dm.org/tsedio/ts-gphoto2-driver/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/tsedio/ts-gphoto2-driver/badge.svg)](https://snyk.io/test/github/tsedio/ts-gphoto2-driver)
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
 - NPM: ~7.10.0
 - Nan: ~2.8.0
 - libgphoto2: ~2.5.x - via `brew install libgphoto2`, `apt-get install libgphoto2-dev` or download and build from `http://www.gphoto.org/proj/libgphoto2/`,
 - pkg-config | dpkg (used for dependency checking)
 - clang compiler

> Note: This package cannot be used in front-end context (like webpack, browserify, etc...). You have to develop your own web server and expose your API.

## Installation

After installing the dependencies, just install using:

```bash
npm install @tsed/gphoto2-core
```

## Usage

Here an example with TypeScript (works also with pure javascript in Node.js):

```typescript
import Path from "path";
import { CameraList, run } from "@tsed/gphoto2-driver";

run(() => {
  const cameraList = new CameraList().load();

  if (cameraList.size) {
    const camera = cameraList.getCamera(0);
    const cameraFile = camera.captureImage();

    cameraFile.save(path.join(__dirname, 'capture.jpeg'));
  }
}, {logLevel: 'debug'})
```

## CameraFile

A lot of different API's of this library returns a CameraFile object.

This object does not contain the image, it is just a pointer to the file in camera's RAM.

You have several options to get your image:

1) Use `.save(filename)` of `.saveAsync(filename)` methods, that will save the image to your filesystem.
2) Use `.getDataAndSizeAsync('binary' | 'base64')` method, which returns following object:

```
{
  data: data, // Buffer for binary format and string for base64.
  size: size
}
```

## Examples

Some examples are available in the `packages/examples/src` directory, when you have cloned or downloaded the complete project from github.

Checkout this project then run `yarn run start:camera`.

## Contribute

Contributors and PR are welcome. Before, just read [contributing guidelines here](./CONTRIBUTING.md) ;)

## License

The MIT License (MIT)

Copyright (c) 2016 - 2018 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis]: https://travis-ci.org/

