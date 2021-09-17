/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteRecord = exports.findRecord = exports.putRecord = exports.handleRequest = void 0;
const cborg_1 = __webpack_require__(/*! cborg */ "../../node_modules/cborg/esm/cborg.js");
const MAX_RECORDS = 3;
function toPathComponents(path = "") {
    // split on / unless escaped with \
    return (path.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean);
}
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
    "Access-Control-Max-Age": "86400",
};
function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null) {
        return new Response(null, {
            headers: corsHeaders,
        });
    }
    else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
            headers: {
                Allow: "GET, HEAD, POST, OPTIONS",
            },
        });
    }
}
async function handleRequest(request) {
    const url = new URL(request.url);
    const segs = toPathComponents(url.pathname);
    // anything after the next / should be ignored
    const key = segs[0];
    if (!key) {
        return fetch(request);
    }
    switch (request.method) {
        case "PUT":
            if (request.body) {
                return putRecord(key, request.body);
            }
            return fetch(request);
        case "GET":
            return findRecord(key);
        case "DELETE":
            return deleteRecord(key);
        case "OPTIONS":
            return handleOptions(request);
        default:
            return fetch(request);
    }
}
exports.handleRequest = handleRequest;
async function putRecord(key, data) {
    await RECORDS.put(key, data);
    return new Response(key);
}
exports.putRecord = putRecord;
async function findRecord(key) {
    const { keys } = await RECORDS.list({ prefix: key });
    const results = [];
    for (const k of keys) {
        const rec = await RECORDS.get(k.name, { type: "arrayBuffer" });
        if (rec && results.length <= MAX_RECORDS) {
            results.push(rec);
        }
    }
    return new Response((0, cborg_1.encode)(results), {
        headers: corsHeaders,
    });
}
exports.findRecord = findRecord;
async function deleteRecord(key) {
    // TODO: verify signature
    await RECORDS.delete(key);
    return new Response(key);
}
exports.deleteRecord = deleteRecord;


/***/ }),

/***/ "../../node_modules/cborg/esm/cborg.js":
/*!*********************************************!*\
  !*** ../../node_modules/cborg/esm/cborg.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* reexport safe */ _lib_decode_js__WEBPACK_IMPORTED_MODULE_1__.decode),
/* harmony export */   "encode": () => (/* reexport safe */ _lib_encode_js__WEBPACK_IMPORTED_MODULE_0__.encode),
/* harmony export */   "Token": () => (/* reexport safe */ _lib_token_js__WEBPACK_IMPORTED_MODULE_2__.Token),
/* harmony export */   "Type": () => (/* reexport safe */ _lib_token_js__WEBPACK_IMPORTED_MODULE_2__.Type)
/* harmony export */ });
/* harmony import */ var _lib_encode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/encode.js */ "../../node_modules/cborg/esm/lib/encode.js");
/* harmony import */ var _lib_decode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/decode.js */ "../../node_modules/cborg/esm/lib/decode.js");
/* harmony import */ var _lib_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/token.js */ "../../node_modules/cborg/esm/lib/token.js");





/***/ }),

/***/ "../../node_modules/cborg/esm/lib/0uint.js":
/*!*************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/0uint.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uintBoundaries": () => (/* binding */ uintBoundaries),
/* harmony export */   "readUint8": () => (/* binding */ readUint8),
/* harmony export */   "readUint16": () => (/* binding */ readUint16),
/* harmony export */   "readUint32": () => (/* binding */ readUint32),
/* harmony export */   "readUint64": () => (/* binding */ readUint64),
/* harmony export */   "decodeUint8": () => (/* binding */ decodeUint8),
/* harmony export */   "decodeUint16": () => (/* binding */ decodeUint16),
/* harmony export */   "decodeUint32": () => (/* binding */ decodeUint32),
/* harmony export */   "decodeUint64": () => (/* binding */ decodeUint64),
/* harmony export */   "encodeUint": () => (/* binding */ encodeUint),
/* harmony export */   "encodeUintValue": () => (/* binding */ encodeUintValue)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");


const uintBoundaries = [
  24,
  256,
  65536,
  4294967296,
  BigInt('18446744073709551616')
];
function readUint8(data, offset, options) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf, token) {
  return encodeUintValue(buf, 0, token.value);
}
function encodeUintValue(buf, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf.push([
      major | 24,
      nuint
    ]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf.push([
      major | 25,
      nuint >>> 8,
      nuint & 255
    ]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf.push([
      major | 26,
      nuint >>> 24 & 255,
      nuint >>> 16 & 255,
      nuint >>> 8 & 255,
      nuint & 255
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [
        major | 27,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf.push(set);
    } else {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/1negint.js":
/*!***************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/1negint.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeNegint8": () => (/* binding */ decodeNegint8),
/* harmony export */   "decodeNegint16": () => (/* binding */ decodeNegint16),
/* harmony export */   "decodeNegint32": () => (/* binding */ decodeNegint32),
/* harmony export */   "decodeNegint64": () => (/* binding */ decodeNegint64),
/* harmony export */   "encodeNegint": () => (/* binding */ encodeNegint)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");



function decodeNegint8(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, -1 - _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, -1 - _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, -1 - _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint32(data, pos + 1, options), 5);
}
const neg1b = BigInt(-1);
const pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint64(data, pos + 1, options);
  if (typeof int !== 'bigint') {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_2__.decodeErrPrefix } integers outside of the safe integer range are not supported`);
  }
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf, token) {
  const negint = token.value;
  const unsigned = typeof negint === 'bigint' ? negint * neg1b - pos1b : negint * -1 - 1;
  _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUintValue(buf, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize(token) {
  const negint = token.value;
  const unsigned = typeof negint === 'bigint' ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < _0uint_js__WEBPACK_IMPORTED_MODULE_1__.uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < _0uint_js__WEBPACK_IMPORTED_MODULE_1__.uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < _0uint_js__WEBPACK_IMPORTED_MODULE_1__.uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < _0uint_js__WEBPACK_IMPORTED_MODULE_1__.uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/2bytes.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/2bytes.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeBytesCompact": () => (/* binding */ decodeBytesCompact),
/* harmony export */   "decodeBytes8": () => (/* binding */ decodeBytes8),
/* harmony export */   "decodeBytes16": () => (/* binding */ decodeBytes16),
/* harmony export */   "decodeBytes32": () => (/* binding */ decodeBytes32),
/* harmony export */   "decodeBytes64": () => (/* binding */ decodeBytes64),
/* harmony export */   "encodeBytes": () => (/* binding */ encodeBytes),
/* harmony export */   "compareBytes": () => (/* binding */ compareBytes)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _byte_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./byte-utils.js */ "../../node_modules/cborg/esm/lib/byte-utils.js");




function toToken(data, pos, prefix, length) {
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, pos, prefix + length);
  const buf = (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_3__.slice)(data, pos + prefix, pos + prefix + length);
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.bytes, buf, prefix + length);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } 64-bit integer bytes lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === undefined) {
    token.encodedBytes = token.type === _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.string ? (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_3__.fromString)(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf, token) {
  const bytes = tokenBytes(token);
  _0uint_js__WEBPACK_IMPORTED_MODULE_2__.encodeUintValue(buf, token.type.majorEncoded, bytes.length);
  buf.push(bytes);
}
encodeBytes.encodedSize = function encodedSize(token) {
  const bytes = tokenBytes(token);
  return _0uint_js__WEBPACK_IMPORTED_MODULE_2__.encodeUintValue.encodedSize(bytes.length) + bytes.length;
};
encodeBytes.compareTokens = function compareTokens(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_3__.compare)(b1, b2);
}

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/3string.js":
/*!***************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/3string.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeStringCompact": () => (/* binding */ decodeStringCompact),
/* harmony export */   "decodeString8": () => (/* binding */ decodeString8),
/* harmony export */   "decodeString16": () => (/* binding */ decodeString16),
/* harmony export */   "decodeString32": () => (/* binding */ decodeString32),
/* harmony export */   "decodeString64": () => (/* binding */ decodeString64),
/* harmony export */   "encodeString": () => (/* binding */ encodeString)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _2bytes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./2bytes.js */ "../../node_modules/cborg/esm/lib/2bytes.js");
/* harmony import */ var _byte_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./byte-utils.js */ "../../node_modules/cborg/esm/lib/byte-utils.js");





function toToken(data, pos, prefix, length) {
  const totLength = prefix + length;
  (0,_common_js__WEBPACK_IMPORTED_MODULE_1__.assertEnoughData)(data, pos, totLength);
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.string, (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_4__.toString)(data, pos + prefix, pos + totLength), totLength);
}
function decodeStringCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeString8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint8(data, pos + 1, options));
}
function decodeString16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint16(data, pos + 1, options));
}
function decodeString32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint32(data, pos + 1, options));
}
function decodeString64(data, pos, _minor, options) {
  const l = _0uint_js__WEBPACK_IMPORTED_MODULE_2__.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } 64-bit integer string lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
const encodeString = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.encodeBytes;

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/4array.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/4array.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeArrayCompact": () => (/* binding */ decodeArrayCompact),
/* harmony export */   "decodeArray8": () => (/* binding */ decodeArray8),
/* harmony export */   "decodeArray16": () => (/* binding */ decodeArray16),
/* harmony export */   "decodeArray32": () => (/* binding */ decodeArray32),
/* harmony export */   "decodeArray64": () => (/* binding */ decodeArray64),
/* harmony export */   "decodeArrayIndefinite": () => (/* binding */ decodeArrayIndefinite),
/* harmony export */   "encodeArray": () => (/* binding */ encodeArray)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");



function toToken(_data, _pos, prefix, length) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.array, length, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_2__.decodeErrPrefix } 64-bit integer array lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_2__.decodeErrPrefix } indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeArray(buf, token) {
  _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUintValue(buf, _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUint.compareTokens;

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/5map.js":
/*!************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/5map.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeMapCompact": () => (/* binding */ decodeMapCompact),
/* harmony export */   "decodeMap8": () => (/* binding */ decodeMap8),
/* harmony export */   "decodeMap16": () => (/* binding */ decodeMap16),
/* harmony export */   "decodeMap32": () => (/* binding */ decodeMap32),
/* harmony export */   "decodeMap64": () => (/* binding */ decodeMap64),
/* harmony export */   "decodeMapIndefinite": () => (/* binding */ decodeMapIndefinite),
/* harmony export */   "encodeMap": () => (/* binding */ encodeMap)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");



function toToken(_data, _pos, prefix, length) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.map, length, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_2__.decodeErrPrefix } 64-bit integer map lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_2__.decodeErrPrefix } indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeMap(buf, token) {
  _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUintValue(buf, _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUint.compareTokens;

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/6tag.js":
/*!************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/6tag.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeTagCompact": () => (/* binding */ decodeTagCompact),
/* harmony export */   "decodeTag8": () => (/* binding */ decodeTag8),
/* harmony export */   "decodeTag16": () => (/* binding */ decodeTag16),
/* harmony export */   "decodeTag32": () => (/* binding */ decodeTag32),
/* harmony export */   "decodeTag64": () => (/* binding */ decodeTag64),
/* harmony export */   "encodeTag": () => (/* binding */ encodeTag)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");


function decodeTagCompact(_data, _pos, minor, _options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag, _0uint_js__WEBPACK_IMPORTED_MODULE_1__.readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf, token) {
  _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUintValue(buf, _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.encodeUint.compareTokens;

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/7float.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/7float.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeUndefined": () => (/* binding */ decodeUndefined),
/* harmony export */   "decodeBreak": () => (/* binding */ decodeBreak),
/* harmony export */   "decodeFloat16": () => (/* binding */ decodeFloat16),
/* harmony export */   "decodeFloat32": () => (/* binding */ decodeFloat32),
/* harmony export */   "decodeFloat64": () => (/* binding */ decodeFloat64),
/* harmony export */   "encodeFloat": () => (/* binding */ encodeFloat)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");



const MINOR_FALSE = 20;
const MINOR_TRUE = 21;
const MINOR_NULL = 22;
const MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } undefined values are not supported`);
  }
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.undefined, undefined, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } indefinite length items not allowed`);
  }
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type["break"], undefined, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } Infinity values are not supported`);
    }
  }
  return new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf, token, options) {
  const float = token.value;
  if (float === false) {
    buf.push([_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf.push([_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf.push([_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === undefined) {
    buf.push([_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === undefined) {
    return 1;
  }
  let decoded;
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
const buffer = new ArrayBuffer(9);
const dataView = new DataView(buffer, 1);
const ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | 1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a, pos) {
  if (ui8a.length - pos < 2) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } not enough data for float16`);
  }
  const half = (ui8a[pos] << 8) + ui8a[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a, pos) {
  if (ui8a.length - pos < 4) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } not enough data for float32`);
  }
  const offset = (ui8a.byteOffset || 0) + pos;
  return new DataView(ui8a.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a, pos) {
  if (ui8a.length - pos < 8) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_1__.decodeErrPrefix } not enough data for float64`);
  }
  const offset = (ui8a.byteOffset || 0) + pos;
  return new DataView(ui8a.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = _0uint_js__WEBPACK_IMPORTED_MODULE_2__.encodeUint.compareTokens;

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/bl.js":
/*!**********************************************!*\
  !*** ../../node_modules/cborg/esm/lib/bl.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bl": () => (/* binding */ Bl)
/* harmony export */ });
/* harmony import */ var _byte_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./byte-utils.js */ "../../node_modules/cborg/esm/lib/byte-utils.js");

const defaultChunkSize = 256;
class Bl {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.chunks = [];
    this.cursor = 0;
    this.maxCursor = -1;
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_0__.slice)(chunk, 0, this.cursor);
      }
    } else {
      byts = (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_0__.concat)(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
}

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/byte-utils.js":
/*!******************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/byte-utils.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useBuffer": () => (/* binding */ useBuffer),
/* harmony export */   "asU8A": () => (/* binding */ asU8A),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "fromString": () => (/* binding */ fromString),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "toHex": () => (/* binding */ toHex),
/* harmony export */   "fromHex": () => (/* binding */ fromHex),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "decodeCodePointsArray": () => (/* binding */ decodeCodePointsArray)
/* harmony export */ });
const useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer === 'function';
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
function isBuffer(buf) {
  return useBuffer && globalThis.Buffer.isBuffer(buf);
}
function asU8A(buf) {
  if (!(buf instanceof Uint8Array)) {
    return Uint8Array.from(buf);
  }
  return isBuffer(buf) ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength) : buf;
}
const toString = useBuffer ? (bytes, start, end) => {
  return end - start > 64 ? globalThis.Buffer.from(bytes.subarray(start, end)).toString('utf8') : utf8Slice(bytes, start, end);
} : (bytes, start, end) => {
  return end - start > 64 ? textDecoder.decode(bytes.subarray(start, end)) : utf8Slice(bytes, start, end);
};
const fromString = useBuffer ? string => {
  return string.length > 64 ? globalThis.Buffer.from(string) : utf8ToBytes(string);
} : string => {
  return string.length > 64 ? textEncoder.encode(string) : utf8ToBytes(string);
};
const fromArray = arr => {
  return Uint8Array.from(arr);
};
const slice = useBuffer ? (bytes, start, end) => {
  if (isBuffer(bytes)) {
    return new Uint8Array(bytes.subarray(start, end));
  }
  return bytes.slice(start, end);
} : (bytes, start, end) => {
  return bytes.slice(start, end);
};
const concat = useBuffer ? (chunks, length) => {
  chunks = chunks.map(c => c instanceof Uint8Array ? c : globalThis.Buffer.from(c));
  return asU8A(globalThis.Buffer.concat(chunks, length));
} : (chunks, length) => {
  const out = new Uint8Array(length);
  let off = 0;
  for (let b of chunks) {
    if (off + b.length > out.length) {
      b = b.subarray(0, out.length - off);
    }
    out.set(b, off);
    off += b.length;
  }
  return out;
};
const alloc = useBuffer ? size => {
  return globalThis.Buffer.allocUnsafe(size);
} : size => {
  return new Uint8Array(size);
};
const toHex = useBuffer ? d => {
  if (typeof d === 'string') {
    return d;
  }
  return globalThis.Buffer.from(toBytes(d)).toString('hex');
} : d => {
  if (typeof d === 'string') {
    return d;
  }
  return Array.prototype.reduce.call(toBytes(d), (p, c) => `${ p }${ c.toString(16).padStart(2, '0') }`, '');
};
const fromHex = useBuffer ? hex => {
  if (hex instanceof Uint8Array) {
    return hex;
  }
  return globalThis.Buffer.from(hex, 'hex');
} : hex => {
  if (hex instanceof Uint8Array) {
    return hex;
  }
  if (!hex.length) {
    return new Uint8Array(0);
  }
  return new Uint8Array(hex.split('').map((c, i, d) => i % 2 === 0 ? `0x${ c }${ d[i + 1] }` : '').filter(Boolean).map(e => parseInt(e, 16)));
};
function toBytes(obj) {
  if (obj instanceof Uint8Array && obj.constructor.name === 'Uint8Array') {
    return obj;
  }
  if (obj instanceof ArrayBuffer) {
    return new Uint8Array(obj);
  }
  if (ArrayBuffer.isView(obj)) {
    return new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength);
  }
  throw new Error('Unknown type, must be binary type');
}
function compare(b1, b2) {
  if (isBuffer(b1) && isBuffer(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string, units = Infinity) {
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function utf8Slice(buf, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
      case 1:
        if (firstByte < 128) {
          codePoint = firstByte;
        }
        break;
      case 2:
        secondByte = buf[offset + 1];
        if ((secondByte & 192) === 128) {
          tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
          if (tempCodePoint > 127) {
            codePoint = tempCodePoint;
          }
        }
        break;
      case 3:
        secondByte = buf[offset + 1];
        thirdByte = buf[offset + 2];
        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
          tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
          if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
            codePoint = tempCodePoint;
          }
        }
        break;
      case 4:
        secondByte = buf[offset + 1];
        thirdByte = buf[offset + 2];
        fourthByte = buf[offset + 3];
        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
          tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
          if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
            codePoint = tempCodePoint;
          }
        }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = '';
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/common.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/common.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeErrPrefix": () => (/* binding */ decodeErrPrefix),
/* harmony export */   "encodeErrPrefix": () => (/* binding */ encodeErrPrefix),
/* harmony export */   "uintMinorPrefixBytes": () => (/* binding */ uintMinorPrefixBytes),
/* harmony export */   "assertEnoughData": () => (/* binding */ assertEnoughData)
/* harmony export */ });
const decodeErrPrefix = 'CBOR decode error:';
const encodeErrPrefix = 'CBOR encode error:';
const uintMinorPrefixBytes = [];
uintMinorPrefixBytes[23] = 1;
uintMinorPrefixBytes[24] = 2;
uintMinorPrefixBytes[25] = 3;
uintMinorPrefixBytes[26] = 5;
uintMinorPrefixBytes[27] = 9;
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${ decodeErrPrefix } not enough data for type`);
  }
}


/***/ }),

/***/ "../../node_modules/cborg/esm/lib/decode.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/decode.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tokeniser": () => (/* binding */ Tokeniser),
/* harmony export */   "tokensToObject": () => (/* binding */ tokensToObject),
/* harmony export */   "decode": () => (/* binding */ decode)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _jump_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jump.js */ "../../node_modules/cborg/esm/lib/jump.js");



const defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
class Tokeniser {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    const byt = this.data[this.pos];
    let token = _jump_js__WEBPACK_IMPORTED_MODULE_2__.quick[byt];
    if (token === undefined) {
      const decoder = _jump_js__WEBPACK_IMPORTED_MODULE_2__.jump[byt];
      if (!decoder) {
        throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } no decoder for major type ${ byt >>> 5 } (byte 0x${ byt.toString(16).padStart(2, '0') })`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this.pos, minor, this.options);
    }
    this.pos += token.encodedLength;
    return token;
  }
}
const DONE = Symbol.for('DONE');
const BREAK = Symbol.for('BREAK');
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } found array but not enough entries (got ${ i }, expected ${ token.value })`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? undefined : {};
  const m = useMaps ? new Map() : undefined;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } got unexpected break to lengthed map`);
    }
    if (key === DONE) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } found map but not enough entries (got ${ i } [no key], expected ${ token.value })`);
    }
    if (useMaps !== true && typeof key !== 'string') {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } non-string keys not supported (got ${ typeof key })`);
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } found map but not enough entries (got ${ i } [no value], expected ${ token.value })`);
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === _token_js__WEBPACK_IMPORTED_MODULE_1__.Type["break"]) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === _token_js__WEBPACK_IMPORTED_MODULE_1__.Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === _token_js__WEBPACK_IMPORTED_MODULE_1__.Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === _token_js__WEBPACK_IMPORTED_MODULE_1__.Type.tag) {
    if (options.tags && typeof options.tags[token.value] === 'function') {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } tag not supported (${ token.value })`);
  }
  throw new Error('unsupported');
}
function decode(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_0__.decodeErrPrefix } too many terminals, data makes no sense`);
  }
  return decoded;
}


/***/ }),

/***/ "../../node_modules/cborg/esm/lib/encode.js":
/*!**************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/encode.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "objectToTokens": () => (/* binding */ objectToTokens),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "encodeCustom": () => (/* binding */ encodeCustom),
/* harmony export */   "Ref": () => (/* binding */ Ref)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/cborg/esm/lib/is.js");
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _bl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bl.js */ "../../node_modules/cborg/esm/lib/bl.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _jump_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jump.js */ "../../node_modules/cborg/esm/lib/jump.js");
/* harmony import */ var _byte_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./byte-utils.js */ "../../node_modules/cborg/esm/lib/byte-utils.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _1negint_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./1negint.js */ "../../node_modules/cborg/esm/lib/1negint.js");
/* harmony import */ var _2bytes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./2bytes.js */ "../../node_modules/cborg/esm/lib/2bytes.js");
/* harmony import */ var _3string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./3string.js */ "../../node_modules/cborg/esm/lib/3string.js");
/* harmony import */ var _4array_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./4array.js */ "../../node_modules/cborg/esm/lib/4array.js");
/* harmony import */ var _5map_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./5map.js */ "../../node_modules/cborg/esm/lib/5map.js");
/* harmony import */ var _6tag_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./6tag.js */ "../../node_modules/cborg/esm/lib/6tag.js");
/* harmony import */ var _7float_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./7float.js */ "../../node_modules/cborg/esm/lib/7float.js");














const defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken: _jump_js__WEBPACK_IMPORTED_MODULE_4__.quickEncodeToken
};
const cborEncoders = [];
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.uint.major] = _0uint_js__WEBPACK_IMPORTED_MODULE_6__.encodeUint;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.negint.major] = _1negint_js__WEBPACK_IMPORTED_MODULE_7__.encodeNegint;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.bytes.major] = _2bytes_js__WEBPACK_IMPORTED_MODULE_8__.encodeBytes;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.string.major] = _3string_js__WEBPACK_IMPORTED_MODULE_9__.encodeString;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.array.major] = _4array_js__WEBPACK_IMPORTED_MODULE_10__.encodeArray;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.map.major] = _5map_js__WEBPACK_IMPORTED_MODULE_11__.encodeMap;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.tag.major] = _6tag_js__WEBPACK_IMPORTED_MODULE_12__.encodeTag;
cborEncoders[_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.float.major] = _7float_js__WEBPACK_IMPORTED_MODULE_13__.encodeFloat;
const buf = new _bl_js__WEBPACK_IMPORTED_MODULE_2__.Bl();
class Ref {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_3__.encodeErrPrefix } object contains circular references`);
    }
    return new Ref(obj, stack);
  }
}
const simpleTokens = {
  null: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["null"], null),
  undefined: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.undefined, undefined),
  true: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["true"], true),
  false: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["false"], false),
  emptyArray: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.array, 0),
  emptyMap: new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.map, 0)
};
const typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.float, obj);
    } else if (obj >= 0) {
      return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.uint, obj);
    } else {
      return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.uint, obj);
    } else {
      return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyArray,
          new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["break"])
        ];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [
        new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.array, obj.length),
        entries,
        new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["break"])
      ];
    }
    return [
      new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.array, obj.length),
      entries
    ];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== 'Object';
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length = isMap ? obj.size : keys.length;
    if (!length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyMap,
          new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["break"])
        ];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [
        new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.map, length),
        entries,
        new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type["break"])
      ];
    }
    return [
      new _token_js__WEBPACK_IMPORTED_MODULE_1__.Token(_token_js__WEBPACK_IMPORTED_MODULE_1__.Type.map, length),
      entries
    ];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of 'Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64'.split(' ')) {
  typeEncoders[`${ typ }Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.is)(obj);
  const customTypeEncoder = options && options.typeEncoders && options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === 'function') {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_3__.encodeErrPrefix } unsupported type: ${ typ }`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn('WARNING: complex key types used, CBOR key sorting guarantees are gone');
  }
  return tcmp;
}
function tokensToEncoded(buf, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf = new _bl_js__WEBPACK_IMPORTED_MODULE_2__.Bl(size);
      encoder(buf, tokens, options);
      if (buf.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${ tokens } was wrong`);
      }
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_5__.asU8A)(buf.chunks[0]);
    }
  }
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}


/***/ }),

/***/ "../../node_modules/cborg/esm/lib/is.js":
/*!**********************************************!*\
  !*** ../../node_modules/cborg/esm/lib/is.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is": () => (/* binding */ is)
/* harmony export */ });
const typeofs = [
  'string',
  'number',
  'bigint',
  'symbol'
];
const objectTypeNames = [
  'Function',
  'Generator',
  'AsyncGenerator',
  'GeneratorFunction',
  'AsyncGeneratorFunction',
  'AsyncFunction',
  'Observable',
  'Array',
  'Buffer',
  'Object',
  'RegExp',
  'Date',
  'Error',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Promise',
  'URL',
  'HTMLElement',
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array'
];
function is(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (value === true || value === false) {
    return 'boolean';
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === 'function') {
    return 'Function';
  }
  if (Array.isArray(value)) {
    return 'Array';
  }
  if (isBuffer(value)) {
    return 'Buffer';
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return 'Object';
}
function isBuffer(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return undefined;
}

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/jump.js":
/*!************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/jump.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jump": () => (/* binding */ jump),
/* harmony export */   "quick": () => (/* binding */ quick),
/* harmony export */   "quickEncodeToken": () => (/* binding */ quickEncodeToken)
/* harmony export */ });
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.js */ "../../node_modules/cborg/esm/lib/token.js");
/* harmony import */ var _0uint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./0uint.js */ "../../node_modules/cborg/esm/lib/0uint.js");
/* harmony import */ var _1negint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./1negint.js */ "../../node_modules/cborg/esm/lib/1negint.js");
/* harmony import */ var _2bytes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./2bytes.js */ "../../node_modules/cborg/esm/lib/2bytes.js");
/* harmony import */ var _3string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3string.js */ "../../node_modules/cborg/esm/lib/3string.js");
/* harmony import */ var _4array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./4array.js */ "../../node_modules/cborg/esm/lib/4array.js");
/* harmony import */ var _5map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./5map.js */ "../../node_modules/cborg/esm/lib/5map.js");
/* harmony import */ var _6tag_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./6tag.js */ "../../node_modules/cborg/esm/lib/6tag.js");
/* harmony import */ var _7float_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./7float.js */ "../../node_modules/cborg/esm/lib/7float.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common.js */ "../../node_modules/cborg/esm/lib/common.js");
/* harmony import */ var _byte_utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./byte-utils.js */ "../../node_modules/cborg/esm/lib/byte-utils.js");











function invalidMinor(data, pos, minor) {
  throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_9__.decodeErrPrefix } encountered invalid minor (${ minor }) for major ${ data[pos] >>> 5 }`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${ _common_js__WEBPACK_IMPORTED_MODULE_9__.decodeErrPrefix } ${ msg }`);
  };
}
const jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.decodeUint8;
jump[25] = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.decodeUint16;
jump[26] = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.decodeUint32;
jump[27] = _0uint_js__WEBPACK_IMPORTED_MODULE_1__.decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = _1negint_js__WEBPACK_IMPORTED_MODULE_2__.decodeNegint8;
jump[57] = _1negint_js__WEBPACK_IMPORTED_MODULE_2__.decodeNegint16;
jump[58] = _1negint_js__WEBPACK_IMPORTED_MODULE_2__.decodeNegint32;
jump[59] = _1negint_js__WEBPACK_IMPORTED_MODULE_2__.decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytesCompact;
}
jump[88] = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes8;
jump[89] = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes16;
jump[90] = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes32;
jump[91] = _2bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer('indefinite length bytes/strings are not supported');
for (let i = 96; i <= 119; i++) {
  jump[i] = _3string_js__WEBPACK_IMPORTED_MODULE_4__.decodeStringCompact;
}
jump[120] = _3string_js__WEBPACK_IMPORTED_MODULE_4__.decodeString8;
jump[121] = _3string_js__WEBPACK_IMPORTED_MODULE_4__.decodeString16;
jump[122] = _3string_js__WEBPACK_IMPORTED_MODULE_4__.decodeString32;
jump[123] = _3string_js__WEBPACK_IMPORTED_MODULE_4__.decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer('indefinite length bytes/strings are not supported');
for (let i = 128; i <= 151; i++) {
  jump[i] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArrayCompact;
}
jump[152] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArray8;
jump[153] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArray16;
jump[154] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArray32;
jump[155] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = _4array_js__WEBPACK_IMPORTED_MODULE_5__.decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMapCompact;
}
jump[184] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMap8;
jump[185] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMap16;
jump[186] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMap32;
jump[187] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = _5map_js__WEBPACK_IMPORTED_MODULE_6__.decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = _6tag_js__WEBPACK_IMPORTED_MODULE_7__.decodeTagCompact;
}
jump[216] = _6tag_js__WEBPACK_IMPORTED_MODULE_7__.decodeTag8;
jump[217] = _6tag_js__WEBPACK_IMPORTED_MODULE_7__.decodeTag16;
jump[218] = _6tag_js__WEBPACK_IMPORTED_MODULE_7__.decodeTag32;
jump[219] = _6tag_js__WEBPACK_IMPORTED_MODULE_7__.decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer('simple values are not supported');
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = _7float_js__WEBPACK_IMPORTED_MODULE_8__.decodeUndefined;
jump[248] = errorer('simple values are not supported');
jump[249] = _7float_js__WEBPACK_IMPORTED_MODULE_8__.decodeFloat16;
jump[250] = _7float_js__WEBPACK_IMPORTED_MODULE_8__.decodeFloat32;
jump[251] = _7float_js__WEBPACK_IMPORTED_MODULE_8__.decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = _7float_js__WEBPACK_IMPORTED_MODULE_8__.decodeBreak;
const quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint, i, 1);
}
quick[64] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.bytes, new Uint8Array(0), 1);
quick[96] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.string, '', 1);
quick[128] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.array, 0, 1);
quick[160] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type.map, 0, 1);
quick[244] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type["false"], false, 1);
quick[245] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type["true"], true, 1);
quick[246] = new _token_js__WEBPACK_IMPORTED_MODULE_0__.Token(_token_js__WEBPACK_IMPORTED_MODULE_0__.Type["null"], null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type["false"]:
    return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([244]);
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type["true"]:
    return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([245]);
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type["null"]:
    return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([246]);
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.bytes:
    if (!token.value.length) {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([64]);
    }
    return;
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.string:
    if (token.value === '') {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([96]);
    }
    return;
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.array:
    if (token.value === 0) {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([128]);
    }
    return;
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.map:
    if (token.value === 0) {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([160]);
    }
    return;
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.uint:
    if (token.value < 24) {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([Number(token.value)]);
    }
    return;
  case _token_js__WEBPACK_IMPORTED_MODULE_0__.Type.negint:
    if (token.value >= -24) {
      return (0,_byte_utils_js__WEBPACK_IMPORTED_MODULE_10__.fromArray)([31 - Number(token.value)]);
    }
  }
}

/***/ }),

/***/ "../../node_modules/cborg/esm/lib/token.js":
/*!*************************************************!*\
  !*** ../../node_modules/cborg/esm/lib/token.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Type": () => (/* binding */ Type),
/* harmony export */   "Token": () => (/* binding */ Token)
/* harmony export */ });
class Type {
  constructor(major, name, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${ this.major }].${ this.name }`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
}
Type.uint = new Type(0, 'uint', true);
Type.negint = new Type(1, 'negint', true);
Type.bytes = new Type(2, 'bytes', true);
Type.string = new Type(3, 'string', true);
Type.array = new Type(4, 'array', false);
Type.map = new Type(5, 'map', false);
Type.tag = new Type(6, 'tag', false);
Type.float = new Type(7, 'float', true);
Type.false = new Type(7, 'false', true);
Type.true = new Type(7, 'true', true);
Type.null = new Type(7, 'null', true);
Type.undefined = new Type(7, 'undefined', true);
Type.break = new Type(7, 'break', true);
class Token {
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = undefined;
  }
  toString() {
    return `Token[${ this.type }].${ this.value }`;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const handler_1 = __webpack_require__(/*! ./handler */ "./src/handler.ts");
addEventListener('fetch', (event) => {
    event.respondWith((0, handler_1.handleRequest)(event.request));
});

})();

/******/ })()
;
//# sourceMappingURL=worker.js.map