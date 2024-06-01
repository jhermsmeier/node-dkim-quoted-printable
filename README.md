# DKIM Quoted-Printable
[![npm version](http://img.shields.io/npm/v/dkim-quoted-printable.svg?style=flat-square)](https://npmjs.com/package/dkim-quoted-printable)
[![npm license](http://img.shields.io/npm/l/dkim-quoted-printable.svg?style=flat-square)](https://npmjs.com/package/dkim-quoted-printable)
[![npm downloads](http://img.shields.io/npm/dm/dkim-quoted-printable.svg?style=flat-square)](https://npmjs.com/package/dkim-quoted-printable)

## Install via npm

```console
npm install dkim-quoted-printable
```

## Usage

```js
const qp = require( 'dkim-quoted-printable' )
```

```js
qp.encode( '😭' ) // -> '=F0=9F=98=AD'
qp.decode( '=F0=9F=98=AD' ) // -> '😭'
```
