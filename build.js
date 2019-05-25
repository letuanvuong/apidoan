module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hapi = __webpack_require__(/*! hapi */ "hapi");

var _hapi2 = _interopRequireDefault(_hapi);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bootstrap = __webpack_require__(/*! ./app/bootstrap/bootstrap.js */ "./app/bootstrap/bootstrap.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_CONFIG_DIR = _path2.default.join(__dirname, '/app/config');
global.CONFIG = __webpack_require__(/*! config */ "config");

var options = _lodash2.default.cloneDeep(global.CONFIG.get('web.connection'));

const server = _hapi2.default.server(options); // Start the server


server.liftOff = async () => {
  try {
    // registering hapi plugins and bootstrap app
    await (0, _bootstrap.loader)(server);
    await server.start();
    console.log('Server started at: ' + server.info.uri);
  } catch (err) {
    console.log('ERROR: ', err);
    process.exit(1);
  }
};

server.liftOff();

/***/ }),

/***/ "./app/bootstrap/bootstrap.js":
/*!************************************!*\
  !*** ./app/bootstrap/bootstrap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const loader = exports.loader = async function (server) {
  const Pack = __webpack_require__(/*! ./../../package */ "./package.json");

  await server.register([{
    plugin: __webpack_require__(/*! inert */ "inert")
  }, {
    plugin: __webpack_require__(/*! vision */ "vision")
  }, {
    plugin: __webpack_require__(/*! hapi-swagger */ "hapi-swagger"),
    // inert, vision dependency
    options: {
      host: global.CONFIG.get('web.swagger.host'),
      schemes: global.CONFIG.get('web.swagger.schemes'),
      info: {
        title: 'Documentation',
        version: Pack.version
      }
    }
  }, {
    plugin: __webpack_require__(/*! ../lib/mongo.js */ "./app/lib/mongo.js")
  }]).then(async err => {
    if (err) {
      console.log(err);
    }
    /* Load models */


    __webpack_require__(/*! @models/giangduong/model.js */ "./app/models/giangduong/model.js");

    __webpack_require__(/*! @models/phong/model.js */ "./app/models/phong/model.js");

    __webpack_require__(/*! @models/quanly/model.js */ "./app/models/quanly/model.js");

    __webpack_require__(/*! @models/loaithietbi/model.js */ "./app/models/loaithietbi/model.js");

    __webpack_require__(/*! @models/thietbi/model.js */ "./app/models/thietbi/model.js");

    __webpack_require__(/*! @models/loainguoidung/model.js */ "./app/models/loainguoidung/model.js");

    __webpack_require__(/*! @models/nguoidung/model.js */ "./app/models/nguoidung/model.js");

    __webpack_require__(/*! @models/nhatkyphanhoi/model.js */ "./app/models/nhatkyphanhoi/model.js");

    __webpack_require__(/*! @models/nhatkysudung/model.js */ "./app/models/nhatkysudung/model.js"); // require('@models/phong-thietbi/model.js')

    /* Load Modules */


    let modules = [];
    modules.push(__webpack_require__(/*! @modules/admin/giangduong */ "./app/modules/admin/giangduong/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/phong */ "./app/modules/admin/phong/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/quanly */ "./app/modules/admin/quanly/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/loaithietbi */ "./app/modules/admin/loaithietbi/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/thietbi */ "./app/modules/admin/thietbi/index.js")); // modules.push(require('@modules/admin/phong-thietbi'))

    modules.push(__webpack_require__(/*! @modules/admin/loainguoidung */ "./app/modules/admin/loainguoidung/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/nguoidung */ "./app/modules/admin/nguoidung/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/nhatkyphanhoi */ "./app/modules/admin/nhatkyphanhoi/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/send-email */ "./app/modules/admin/send-email/index.js"));
    modules.push(__webpack_require__(/*! @modules/admin/nhatkysudung */ "./app/modules/admin/nhatkysudung/index.js"));

    if (modules.length) {
      let options = {};
      options.routes = {
        prefix: '/api/v1'
      };
      await server.register(modules, options, err => {
        if (err) {
          console.log(err);
        }
      });
    } // console.log(server)

  });
};

/***/ }),

/***/ "./app/lib/mongo.js":
/*!**************************!*\
  !*** ./app/lib/mongo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoosePaginate = __webpack_require__(/*! mongoose-paginate */ "mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async function (server, options) {
  await _mongoose2.default.connect(global.CONFIG.get('web.db.uri'), {
    useNewUrlParser: true
  });

  _mongoose2.default.set('useCreateIndex', true);

  _mongoose2.default.plugin(_mongoosePaginate2.default);

  console.log('Register Mongo:', global.CONFIG.get('web.db.uri'));
};

exports.name = 'app-mongo';

/***/ }),

/***/ "./app/models/giangduong/model.js":
/*!****************************************!*\
  !*** ./app/models/giangduong/model.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/giangduong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GiangDuongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
GiangDuongSchema.virtual('dsphongs', {
  ref: 'Phong',
  localField: '_id',
  foreignField: 'giangDuongID'
});
exports.default = _mongoose2.default.model('GiangDuong', GiangDuongSchema);

/***/ }),

/***/ "./app/models/giangduong/schema.js":
/*!*****************************************!*\
  !*** ./app/models/giangduong/schema.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  ten: String,
  soTang: Number,
  hinhAnhs: [String],
  quanLyID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'QuanLy'
  }
};
const options = {
  collection: 'giangduongs',
  timestamps: true,
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/loainguoidung/model.js":
/*!*******************************************!*\
  !*** ./app/models/loainguoidung/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/loainguoidung/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiNguoiDungSchema = new _mongoose.Schema(_schema.schema, _schema.options);
LoaiNguoiDungSchema.virtual('dsnguoidungs', {
  ref: 'NguoiDung',
  localField: '_id',
  foreignField: 'loaiNguoiDungID'
});
exports.default = _mongoose2.default.model('LoaiNguoiDung', LoaiNguoiDungSchema);

/***/ }),

/***/ "./app/models/loainguoidung/schema.js":
/*!********************************************!*\
  !*** ./app/models/loainguoidung/schema.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiNguoiDung: String,
  moTa: String
};
const options = {
  collection: 'loainguoidungs',
  timestamps: true,
  vituals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/loaithietbi/model.js":
/*!*****************************************!*\
  !*** ./app/models/loaithietbi/model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/loaithietbi/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiThietBiSchema = new _mongoose.Schema(_schema.schema, _schema.options);
LoaiThietBiSchema.virtual('dsthietbis', {
  ref: 'ThietBi',
  localField: '_id',
  foreignField: 'loaiThietBiID'
});
exports.default = _mongoose2.default.model('LoaiThietBi', LoaiThietBiSchema);

/***/ }),

/***/ "./app/models/loaithietbi/schema.js":
/*!******************************************!*\
  !*** ./app/models/loaithietbi/schema.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiThietBi: String,
  xuatXu: String
};
const options = {
  collection: 'loaithietbis',
  timestamps: true,
  vituals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/nguoidung/model.js":
/*!***************************************!*\
  !*** ./app/models/nguoidung/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/nguoidung/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NguoiDungSchema = new _mongoose.Schema(_schema.schema, _schema.options);
NguoiDungSchema.virtual('dsnhatkyphanhoitunguoidung', {
  ref: 'NhatKyPhanHoi',
  localField: '_id',
  foreignField: 'nguoiDungID'
});
exports.default = _mongoose2.default.model('NguoiDung', NguoiDungSchema);

/***/ }),

/***/ "./app/models/nguoidung/schema.js":
/*!****************************************!*\
  !*** ./app/models/nguoidung/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  tenNguoiDung: String,
  ngaySinh: Date,
  gioiTinh: String,
  soDT: String,
  email: String,
  hinhAnhs: [String],
  userName: String,
  password: String,
  loaiNguoiDungID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiNguoiDung'
  }
};
const options = {
  collection: 'nguoidungs',
  timestamps: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/nhatkyphanhoi/model.js":
/*!*******************************************!*\
  !*** ./app/models/nhatkyphanhoi/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/nhatkyphanhoi/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NhatKyPhanHoiSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('NhatKyPhanHoi', NhatKyPhanHoiSchema);

/***/ }),

/***/ "./app/models/nhatkyphanhoi/schema.js":
/*!********************************************!*\
  !*** ./app/models/nhatkyphanhoi/schema.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  soLuong: Number,
  tinhTrang: String,
  moTa: String,
  thoiGianDuyet: Date,
  ngayPhanHoi: {
    type: Date,
    default: Date.now()
  },
  trangThai: {
    type: String,
    default: 'Chưa duyệt'
  },
  nguoiYeuCauID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'NguoiDung'
  },
  nguoiPheDuyetId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'NguoiDung'
  },
  thietBiID: {
    type: _mongoose.Schema.Types.ObjectId
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  }
};
const options = {
  collection: 'nhatkyphanhois',
  timestamps: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/nhatkysudung/model.js":
/*!******************************************!*\
  !*** ./app/models/nhatkysudung/model.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/nhatkysudung/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NhatKySuDungSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('NhatKySuDung', NhatKySuDungSchema);

/***/ }),

/***/ "./app/models/nhatkysudung/schema.js":
/*!*******************************************!*\
  !*** ./app/models/nhatkysudung/schema.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  ngayNhap: Date,
  moTa: String,
  thietBiID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'ThietBi'
  }
};
const options = {
  collection: 'nhatkysudungs',
  timestamps: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/phong/model.js":
/*!***********************************!*\
  !*** ./app/models/phong/model.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/phong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
PhongSchema.virtual('dsnhatkyphanhoiphongthietbi', {
  ref: 'NhatKyPhanHoi',
  localField: '_id',
  foreignField: 'phongID'
});
exports.default = _mongoose2.default.model('Phong', PhongSchema);

/***/ }),

/***/ "./app/models/phong/schema.js":
/*!************************************!*\
  !*** ./app/models/phong/schema.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  tenPhong: String,
  sucChua: Number,
  tinhTrang: {
    type: String
  },
  hinhAnhs: [String],
  giangDuongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'GiangDuong'
  },
  thietBis: [{
    item: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'ThietBi'
    },
    tinhTrangSoLuong: [{
      tinhTrang: String,
      soLuong: Number
    }],
    ghiChu: String
  }]
};
const options = {
  collection: 'phongs',
  timestamps: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/quanly/model.js":
/*!************************************!*\
  !*** ./app/models/quanly/model.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/quanly/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QuanLySchema = new _mongoose.Schema(_schema.schema, _schema.options);
QuanLySchema.virtual('dsgiangduongs', {
  ref: 'GiangDuong',
  localField: '_id',
  foreignField: 'quanLyID'
});
exports.default = _mongoose2.default.model('QuanLy', QuanLySchema);

/***/ }),

/***/ "./app/models/quanly/schema.js":
/*!*************************************!*\
  !*** ./app/models/quanly/schema.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenNguoiQL: String,
  ngaySinh: Date,
  gioiTinh: Boolean,
  SDT: String,
  diaChi: String
};
const options = {
  collection: 'quanlys',
  timestamps: true,
  vituals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/thietbi/model.js":
/*!*************************************!*\
  !*** ./app/models/thietbi/model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/thietbi/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ThietBiSchema = new _mongoose.Schema(_schema.schema, _schema.options);
ThietBiSchema.virtual('dsphongsudung', {
  ref: 'Phong',
  localField: '_id',
  foreignField: 'thietBis.item'
});
exports.default = _mongoose2.default.model('ThietBi', ThietBiSchema);

/***/ }),

/***/ "./app/models/thietbi/schema.js":
/*!**************************************!*\
  !*** ./app/models/thietbi/schema.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  tenThietBi: String,
  hinhAnhs: [String],
  moTa: String,
  loaiThietBiID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiThietBi'
  } // phongs: [{
  //   item: {
  //     type: Schema.Types.ObjectId,
  //     ref:'Phong'
  //   },
  //   tinhTrang: String,
  //   soLuong: Number,
  //   ghiChu: String
  // }]

};
const options = {
  collection: 'thietbis',
  timestamps: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/modules/admin/giangduong/controller/index.js":
/*!**********************************************************!*\
  !*** ./app/modules/admin/giangduong/controller/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GiangDuong = _mongoose2.default.model('GiangDuong');

const save = async (request, h) => {
  try {
    let data = request.payload; //tách img bên payload form thành image và base64

    let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL; //convert base64 to image------------------------------------------------

    if (base64 && base64.match(/data(.*?)base64,/)) {
      // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
      let base64Data = base64.replace(/data(.*?)base64,/, "");

      __webpack_require__(/*! fs */ "fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {});

      data.hinhAnhs = data.hinhAnhs.image;
    } //--------------------------------------------------------------------------


    let item;

    if (!data._id) {
      item = await GiangDuong.create(data);
    } else {
      item = await GiangDuong.findByIdAndUpdate(data._id, {
        ten: data.ten,
        quanLyID: data.quanLyID,
        soTang: data.soTang,
        hinhAnhs: data.hinhAnhs
      });
    }

    return item;
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await GiangDuong.find().populate([{
    path: 'dsphongs',
    populate: [{
      path: 'thietBis.item'
    }]
  }, {
    path: 'quanLyID'
  }]).lean();
};

const Delete = async (request, h) => {
  return await GiangDuong.findOneAndRemove({
    _id: request.params.id
  });
}; // const get = async (request, h) =>{
//     return await GiangDuong.find()
// }


const getByid = async (request, h) => {
  return await GiangDuong.findById({
    _id: request.params.id
  });
};

exports.default = {
  save,
  get,
  getByid,
  Delete
};

/***/ }),

/***/ "./app/modules/admin/giangduong/index.js":
/*!***********************************************!*\
  !*** ./app/modules/admin/giangduong/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/giangduong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-giangduong';

/***/ }),

/***/ "./app/modules/admin/giangduong/routes/index.js":
/*!******************************************************!*\
  !*** ./app/modules/admin/giangduong/routes/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/giangduong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/giangduong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/giangduong',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-giangduong',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/image/{img}',
  handler: function (request, h) {
    try {
      return h.file('app/lib/img/' + request.params.img);
    } catch (err) {}
  }
}, {
  method: 'GET',
  path: '/getbyid-giangduong/{id}',
  handler: _index2.default.getByid,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-giangduong/{id}',
  handler: _index2.default.Delete
}];

/***/ }),

/***/ "./app/modules/admin/giangduong/validate/index.js":
/*!********************************************************!*\
  !*** ./app/modules/admin/giangduong/validate/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //muon dung object thi Joi phai khai bao la const chu k import
//neu import phai nho lenh

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.objectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const GiangDuongVal = {
  save: {
    payload: {
      _id: Joi.string(),
      ten: Joi.string().required(),
      soTang: Joi.number().required(),
      hinhAnhs: [Joi.object().required(), Joi.string().required()],
      quanLyID: Joi.string().length(24)
    }
  },
  options: {
    allowUnknown: true
  }
};
exports.default = { ...GiangDuongVal
};

/***/ }),

/***/ "./app/modules/admin/loainguoidung/controller/index.js":
/*!*************************************************************!*\
  !*** ./app/modules/admin/loainguoidung/controller/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiNguoiDung = _mongoose2.default.model('LoaiNguoiDung');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new LoaiNguoiDung(data);
    } else {
      item = await LoaiNguoiDung.findById(data._id);
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await LoaiNguoiDung.find().populate({
    path: 'dsnguoidungs'
  }).lean();
};

const Delete = async (request, h) => {
  return await LoaiNguoiDung.findOneAndRemove({
    _id: request.params.id
  });
};

exports.default = {
  save,
  get,
  Delete
};

/***/ }),

/***/ "./app/modules/admin/loainguoidung/index.js":
/*!**************************************************!*\
  !*** ./app/modules/admin/loainguoidung/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/admin/loainguoidung/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-loainguoidung';

/***/ }),

/***/ "./app/modules/admin/loainguoidung/routes/index.js":
/*!*********************************************************!*\
  !*** ./app/modules/admin/loainguoidung/routes/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/admin/loainguoidung/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/admin/loainguoidung/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/loainguoidung',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-loainguoidung',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-loainguoidung/{id}',
  handler: _index2.default.Delete
}];

/***/ }),

/***/ "./app/modules/admin/loainguoidung/validate/index.js":
/*!***********************************************************!*\
  !*** ./app/modules/admin/loainguoidung/validate/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const LoaiNguoiDungVal = {
  save: {
    payload: {
      tenLoaiNguoiDung: Joi.string().required(),
      moTa: Joi.string().required()
    }
  }
};
exports.default = { ...LoaiNguoiDungVal
};

/***/ }),

/***/ "./app/modules/admin/loaithietbi/controller/index.js":
/*!***********************************************************!*\
  !*** ./app/modules/admin/loaithietbi/controller/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiThietBi = _mongoose2.default.model('LoaiThietBi');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new LoaiThietBi(data);
    } else {
      item = await LoaiThietBi.findById(data._id);
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await LoaiThietBi.find().populate([{
    path: 'dsthietbis',
    populate: [{
      path: 'dsphongsudung'
    }]
  }]).lean();
};

exports.default = {
  save,
  get
};

/***/ }),

/***/ "./app/modules/admin/loaithietbi/index.js":
/*!************************************************!*\
  !*** ./app/modules/admin/loaithietbi/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/loaithietbi/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-loaithietbi';

/***/ }),

/***/ "./app/modules/admin/loaithietbi/routes/index.js":
/*!*******************************************************!*\
  !*** ./app/modules/admin/loaithietbi/routes/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/loaithietbi/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/loaithietbi/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/loaithietbi',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-loaithietbi',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/admin/loaithietbi/validate/index.js":
/*!*********************************************************!*\
  !*** ./app/modules/admin/loaithietbi/validate/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const LoaiThietBiVal = {
  save: {
    payload: {
      tenLoaiThietBi: Joi.string().required(),
      xuatXu: Joi.string().required()
    }
  }
};
exports.default = { ...LoaiThietBiVal
};

/***/ }),

/***/ "./app/modules/admin/nguoidung/controller/index.js":
/*!*********************************************************!*\
  !*** ./app/modules/admin/nguoidung/controller/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NguoiDung = _mongoose2.default.model('NguoiDung');

const save = async (request, h) => {
  try {
    let data = request.payload; //tách img bên payload form thành image và base64

    let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL; //convert base64 to image------------------------------------------------

    if (base64 && base64.match(/data(.*?)base64,/)) {
      // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
      let base64Data = base64.replace(/data(.*?)base64,/, "");

      __webpack_require__(/*! fs */ "fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {});

      data.hinhAnhs = data.hinhAnhs.image;
    } //--------------------------------------------------------------------------


    let item;

    if (!data._id) {
      item = await NguoiDung.create(data);
    } else {
      item = await NguoiDung.findByIdAndUpdate(data._id, {
        tenNguoiDung: data.tenNguoiDung,
        ngaySinh: data.ngaySinh,
        gioiTinh: data.gioiTinh,
        soDT: data.soDT,
        email: data.email,
        hinhAnhs: data.hinhAnhs,
        userName: data.userName,
        password: data.password,
        loaiNguoiDungID: data.loaiNguoiDungID
      });
    }

    return item;
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await NguoiDung.find().populate([{
    path: 'loaiNguoiDungID'
  }, {
    path: 'dsnhatkyphanhoitunguoidung'
  }]).lean();
};

const Delete = async (request, h) => {
  return await NguoiDung.findOneAndRemove({
    _id: request.params.id
  });
};

const login = async (request, h) => {
  try {
    let {
      payload
    } = request;
    let user = await NguoiDung.findOne({
      userName: payload.userName,
      password: payload.password
    }).lean();

    if (!user) {
      return {
        login: false
      };
    } else {
      return { ...user,
        login: true
      };
    }
  } catch (error) {
    _boom2.default.badRequest(error);
  }
};

exports.default = {
  save,
  get,
  Delete,
  login
};

/***/ }),

/***/ "./app/modules/admin/nguoidung/index.js":
/*!**********************************************!*\
  !*** ./app/modules/admin/nguoidung/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/nguoidung/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-nguoidung';

/***/ }),

/***/ "./app/modules/admin/nguoidung/routes/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/admin/nguoidung/routes/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/admin/nguoidung/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/admin/nguoidung/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/nguoidung',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-nguoidungs',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-nguoidung/{id}',
  handler: _index2.default.Delete
}, {
  method: 'POST',
  path: '/login',
  handler: _index2.default.login,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/admin/nguoidung/validate/index.js":
/*!*******************************************************!*\
  !*** ./app/modules/admin/nguoidung/validate/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const NguoiDungVal = {
  save: {
    payload: {
      _id: Joi.string(),
      tenNguoiDung: Joi.string(),
      ngaySinh: Joi.date(),
      gioiTinh: Joi.string(),
      soDT: Joi.string(),
      email: Joi.string(),
      hinhAnhs: [Joi.object().required(), Joi.string().required()],
      userName: Joi.string(),
      password: Joi.string(),
      loaiNguoiDungID: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...NguoiDungVal
};

/***/ }),

/***/ "./app/modules/admin/nhatkyphanhoi/controller/index.js":
/*!*************************************************************!*\
  !*** ./app/modules/admin/nhatkyphanhoi/controller/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

const NhatKyPhanHoi = _mongoose2.default.model('NhatKyPhanHoi');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = await NhatKyPhanHoi.create(data);
    } else {
      item = await NhatKyPhanHoi.findByIdAndUpdate(data._id, {
        soLuong: data.soLuong,
        tinhTrang: data.tinhTrang,
        trangThai: data.trangThai,
        moTa: data.moTa,
        nguoiYeuCauID: data.nguoiYeuCauID,
        phongID: data.phongID,
        thietBiID: data.thietBiID,
        nguoiPheDuyetId: data.nguoiPheDuyetId,
        thoiGianDuyet: data.thoiGianDuyet
      });
    } // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'letuanvuongk57@gmail.com',
    //     pass: '01686741583'
    //   }
    // });
    // var mailOptions = {
    //   from: 'letuanvuongk57@gmail.com',
    //   to: 'vuonggl.it@gmail.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };
    // console.log(123213123)
    // data = await transporter.sendMail(mailOptions);
    // console.log(data)


    return item;
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  try {
    return await NhatKyPhanHoi.find().populate([// {
    //   path:'TinhTrangThietBiID'
    // },
    {
      path: 'nguoiYeuCauID'
    }, {
      path: 'nguoiPheDuyetId'
    }, {
      path: 'phongID',
      populate: [{
        path: 'thietBis.item'
      }]
    }]).lean();
  } catch (error) {
    console.log(error);
  }
};

exports.default = {
  save,
  get
};

/***/ }),

/***/ "./app/modules/admin/nhatkyphanhoi/index.js":
/*!**************************************************!*\
  !*** ./app/modules/admin/nhatkyphanhoi/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/nhatkyphanhoi/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-nhatkyphanhoi';

/***/ }),

/***/ "./app/modules/admin/nhatkyphanhoi/routes/index.js":
/*!*********************************************************!*\
  !*** ./app/modules/admin/nhatkyphanhoi/routes/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/admin/nhatkyphanhoi/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/admin/nhatkyphanhoi/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/nhatkyphanhoi',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-nhatkyphanhoi',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/admin/nhatkyphanhoi/validate/index.js":
/*!***********************************************************!*\
  !*** ./app/modules/admin/nhatkyphanhoi/validate/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const NhatKyPhanHoiVal = {
  save: {
    payload: {
      _id: Joi.string() // soLuong: Joi.number().required(),
      // tinhTrang: Joi.string().required(),
      // moTa: Joi.string().required(),
      // thoiGianDuyet: Joi.date(),
      // ngayCapNhat: Joi.date(),
      // trangThai: Joi.string(),
      // tinhTrangThietBiID: Joi.string().length(24),
      // nguoiDungID: Joi.string().length(24),
      // phongID: Joi.string().length(24),

    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...NhatKyPhanHoiVal
};

/***/ }),

/***/ "./app/modules/admin/nhatkysudung/controller/index.js":
/*!************************************************************!*\
  !*** ./app/modules/admin/nhatkysudung/controller/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NhatKySuDung = _mongoose2.default.model('NhatKySuDung');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item;

    if (!data._id) {
      item = await NhatKySuDung.create(data);
    } else {
      item = await NhatKySuDung.findByIdAndUpdate(data._id, {
        ngayNhap: data.ngayNhap,
        moTa: data.moTa,
        thietBiID: data.thietBiID
      });
    }

    return item;
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await NhatKySuDung.find().populate({
    path: 'thietBiID'
  }).lean();
};

const Delete = async (request, h) => {
  return await NhatKySuDung.findByIdAndRemove({
    _id: request.params.id
  });
};

exports.default = {
  save,
  get,
  Delete
};

/***/ }),

/***/ "./app/modules/admin/nhatkysudung/index.js":
/*!*************************************************!*\
  !*** ./app/modules/admin/nhatkysudung/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/nhatkysudung/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-nhatkysudung';

/***/ }),

/***/ "./app/modules/admin/nhatkysudung/routes/index.js":
/*!********************************************************!*\
  !*** ./app/modules/admin/nhatkysudung/routes/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/nhatkysudung/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/nhatkysudung/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/nhatkysudung',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-nhatkysudung',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-nhatkysudung/{id}',
  handler: _index2.default.Delete
}];

/***/ }),

/***/ "./app/modules/admin/nhatkysudung/validate/index.js":
/*!**********************************************************!*\
  !*** ./app/modules/admin/nhatkysudung/validate/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const NhatKySuDungVal = {
  save: {
    payload: {
      _id: Joi.string(),
      ngayNhap: Joi.date(),
      moTa: Joi.string(),
      thietBiID: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...NhatKySuDungVal
};

/***/ }),

/***/ "./app/modules/admin/phong/controller/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/admin/phong/controller/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Phong = _mongoose2.default.model('Phong');

const save = async (request, h) => {
  try {
    let data = request.payload; //tách img bên payload form thành image và base64

    let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL; //convert base64 to image------------------------------------------------

    if (base64 && base64.match(/data(.*?)base64,/)) {
      // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
      let base64Data = base64.replace(/data(.*?)base64,/, "");

      __webpack_require__(/*! fs */ "fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {});

      data.hinhAnhs = data.hinhAnhs.image;
    } //--------------------------------------------------------------------------


    let item;

    if (!data._id) {
      item = await Phong.create(data);
    } else {
      item = await Phong.findByIdAndUpdate(data._id, {
        tenPhong: data.tenPhong,
        sucChua: data.sucChua,
        tinhTrang: data.tinhTrang,
        hinhAnhs: data.hinhAnhs,
        giangDuongID: data.giangDuongID
      });
    }

    return item;
  } catch (error) {
    throw error;
  }
};

const saveThietBi = async request => {
  try {
    let {
      payload
    } = request;
    let phong = await Phong.findById(payload.phongId);

    if (!phong) {
      return _boom2.default.notFound('Phong not found.');
    }

    if (!(Array.isArray(phong.thietBis) && phong.thietBis.length)) {
      phong.thietBis = [];
    }

    if (payload._id) {
      let index = phong.thietBis.findIndex(item => String(item._id) === payload._id);

      if (index === -1) {
        return _boom2.default.notFound('Khong tim thay thiet bi nay trong phong.');
      }

      let indexThietBi = phong.thietBis.findIndex(item => String(item.item) === payload.thietbiId);

      if (indexThietBi !== -1 && indexThietBi !== index) {
        return _boom2.default.badRequest('Thiet bi da ton tai trong phong nay.');
      }

      phong.thietBis[index].item = payload.thietbiId;
      phong.thietBis[index].tinhTrangSoLuong = payload.tinhTrangSoLuong; // phong.thietBis[index].soLuong = payload.soLuong

      phong.thietBis[index].ghiChu = payload.ghiChu;
    } else {
      let index = phong.thietBis.findIndex(item => String(item.item) === payload.thietbiId);

      if (index !== -1) {
        return _boom2.default.badRequest('Thiet bi da ton tai trong phong nay.');
      }

      phong.thietBis.push({
        item: payload.thietbiId,
        tinhTrangSoLuong: payload.tinhTrangSoLuong,
        // tinhTrang: payload.tinhTrang,
        // soLuong: payload.soLuong,
        ghiChu: payload.ghiChu
      });
    }

    await phong.save();
    return true;
  } catch (error) {
    return _boom2.default.badRequest(error);
  }
}; // const get = async (request, h) =>{
//     return await Phong.find().populate([{path: 'giangDuongID'},{path: 'dsphongthietbis'}]).lean()
// }


const get = async (request, h) => {
  return await Phong.find().populate([{
    path: 'giangDuongID'
  }, {
    path: 'dsnhatkyphanhoiphongthietbi'
  }]).lean();
};

const Delete = async (request, h) => {
  return await Phong.findOneAndRemove({
    _id: request.params.id
  });
}; //từ id lấy ra dược chi tiết trong id đó thì populate


const getByid = async (request, h) => {
  return await Phong.findById({
    _id: request.params.id
  }).populate([{
    path: 'giangDuongID'
  }, {
    path: 'thietBis.item'
  }, {
    path: 'dsnhatkyphanhoiphongthietbi'
  }]).lean();
}; // delete thiet bi trong phong


const DeleteThietbi = async (request, h) => {
  let phong = await Phong.findById(request.params.phongId);
  let index = phong.thietBis.findIndex(thietBi => String(thietBi._id) === request.params._id);

  if (index !== -1) {
    phong.thietBis.splice(index, 1);
  }

  await phong.save();
  return phong;
};

exports.default = {
  save,
  get,
  saveThietBi,
  Delete,
  getByid,
  DeleteThietbi
};

/***/ }),

/***/ "./app/modules/admin/phong/index.js":
/*!******************************************!*\
  !*** ./app/modules/admin/phong/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/phong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-phong';

/***/ }),

/***/ "./app/modules/admin/phong/routes/index.js":
/*!*************************************************!*\
  !*** ./app/modules/admin/phong/routes/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/phong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/phong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/phong',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-phongs',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-phong/{id}',
  handler: _index2.default.Delete
}, // {
//   method: 'GET',
//   path: '/image/{img}',
//   handler: function(request, h){
//     try {
//       return h.file('app/lib/img'+ request.params.img);
//     } catch (err) {
//     }
//   }
// }
{
  method: 'GET',
  path: '/getbyid-phong/{id}',
  handler: _index2.default.getByid,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phong-thietbi',
  handler: _index2.default.saveThietBi,
  config: {
    validate: _index4.default.saveThietBi,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/phong/{phongId}/delete-phong-thietbi/{_id}',
  handler: _index2.default.DeleteThietbi
}];

/***/ }),

/***/ "./app/modules/admin/phong/validate/index.js":
/*!***************************************************!*\
  !*** ./app/modules/admin/phong/validate/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const PhongVal = {
  save: {
    payload: {
      _id: Joi.string(),
      tenPhong: Joi.string(),
      sucChua: Joi.number(),
      tinhTrang: Joi.string(),
      hinhAnhs: [Joi.object().required(), Joi.string().required()],
      giangDuongID: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  },
  saveThietBi: {
    payload: {
      phongId: Joi.string(),
      // tinhTrang: Joi.string(),
      // soLuong: Joi.number(),
      ghiChu: Joi.string(),
      thietBiId: Joi.string()
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...PhongVal
};

/***/ }),

/***/ "./app/modules/admin/quanly/controller/index.js":
/*!******************************************************!*\
  !*** ./app/modules/admin/quanly/controller/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QuanLy = _mongoose2.default.model('QuanLy');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new QuanLy(data);
    } else {
      item = await QuanLy.findById(data._id);
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (error) {
    throw error;
  }
};

const get = async (request, h) => {
  return await QuanLy.find().populate('dsgiangduongs').lean();
};

const Delete = async (request, h) => {
  return await QuanLy.findByIdAndRemove({
    _id: request.params.id
  });
};

exports.default = {
  save,
  get,
  Delete
};

/***/ }),

/***/ "./app/modules/admin/quanly/index.js":
/*!*******************************************!*\
  !*** ./app/modules/admin/quanly/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/quanly/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-quanly';

/***/ }),

/***/ "./app/modules/admin/quanly/routes/index.js":
/*!**************************************************!*\
  !*** ./app/modules/admin/quanly/routes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/quanly/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/quanly/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/quanly',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        reponses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'Json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-quanly',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        reponses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'Json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-quanly/{id}',
  handler: _index2.default.Delete,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        reponses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'Json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/admin/quanly/validate/index.js":
/*!****************************************************!*\
  !*** ./app/modules/admin/quanly/validate/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QuanLyVal = {
  save: {
    payload: {
      _id: _joi2.default.string(),
      tenNguoiQL: _joi2.default.string().required(),
      ngaySinh: _joi2.default.date().required(),
      gioiTinh: _joi2.default.boolean().required(),
      SDT: _joi2.default.string().required(),
      diaChi: _joi2.default.string().required()
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = QuanLyVal;

/***/ }),

/***/ "./app/modules/admin/send-email/controller/index.js":
/*!**********************************************************!*\
  !*** ./app/modules/admin/send-email/controller/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

const sendEmail = async request => {
  let {
    hoTen,
    email,
    soDienThoai,
    title,
    message
  } = request.payload;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'letuanvuongk57@gmail.com',
      pass: '01686741583'
    }
  });
  var mailOptions = {
    from: 'letuanvuongk57@gmail.com',
    to: 'vuonggl.it@gmail.com',
    subject: title,
    html: `<div>
        Họ tên: <strong>${hoTen}</strong>
      </div>
      <div>
        Email: <strong>${email}</strong>
      </div>
      <div>
        Số điện thoại: <strong>${soDienThoai}</strong>
      </div>
      <div>
        Tiêu đề: <strong>${title}</strong>
      </div>
      <div>
        Nội dung: <strong>${message}</strong>
      </div>`
  };
  let data = await transporter.sendMail(mailOptions);
  console.log(data);
  return {
    success: true
  };
};

exports.default = {
  sendEmail
};

/***/ }),

/***/ "./app/modules/admin/send-email/index.js":
/*!***********************************************!*\
  !*** ./app/modules/admin/send-email/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/send-email/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'send-email';

/***/ }),

/***/ "./app/modules/admin/send-email/routes/index.js":
/*!******************************************************!*\
  !*** ./app/modules/admin/send-email/routes/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/send-email/controller/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/send-email',
  handler: _index2.default.sendEmail,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/admin/thietbi/controller/index.js":
/*!*******************************************************!*\
  !*** ./app/modules/admin/thietbi/controller/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'user strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _https = __webpack_require__(/*! https */ "https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ThietBi = _mongoose2.default.model('ThietBi');

const save = async (request, h) => {
  try {
    let data = request.payload; //tách img bên payload form thành image và base64

    let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL; //convert base64 to image------------------------------------------------

    if (base64 && base64.match(/data(.*?)base64,/)) {
      // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
      let base64Data = base64.replace(/data(.*?)base64,/, "");

      __webpack_require__(/*! fs */ "fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {});

      data.hinhAnhs = data.hinhAnhs.image;
    } //--------------------------------------------------------------------------


    let item;

    if (!data._id) {
      item = await ThietBi.create(data);
    } else {
      item = await ThietBi.findByIdAndUpdate(data._id, {
        tenThietBi: data.tenThietBi,
        hinhAnhs: data.hinhAnhs,
        moTa: data.moTa,
        loaiThietBiID: data.loaiThietBiID
      });
    }

    return item;
  } catch (error) {
    throw error;
  }
}; // const get = async (request, h)=>{
//   return await ThietBi.find().populate([{path:'loaiThietBiID'},{path:'dsphongthietbis'}]).lean()
// }


const get = async (request, h) => {
  return await ThietBi.find().populate([{
    path: 'loaiThietBiID'
  }, {
    path: 'dsphongsudung'
  }]).lean();
};

const Delete = async (request, h) => {
  return await ThietBi.findByIdAndRemove({
    _id: request.params.id
  });
};

exports.default = {
  save,
  get,
  Delete
};

/***/ }),

/***/ "./app/modules/admin/thietbi/index.js":
/*!********************************************!*\
  !*** ./app/modules/admin/thietbi/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/admin/thietbi/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, option) => {
  server.route(_index2.default);
};

exports.name = 'admin-thietbi';

/***/ }),

/***/ "./app/modules/admin/thietbi/routes/index.js":
/*!***************************************************!*\
  !*** ./app/modules/admin/thietbi/routes/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/admin/thietbi/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/admin/thietbi/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/thietbi',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-thietbi',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/delete-thietbi/{id}',
  handler: _index2.default.Delete
}];

/***/ }),

/***/ "./app/modules/admin/thietbi/validate/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/admin/thietbi/validate/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

const ThietBiVal = {
  save: {
    payload: {
      _id: Joi.string(),
      tenThietBi: Joi.string(),
      hinhAnhs: [Joi.object().required(), Joi.string().required()],
      moTa: Joi.string(),
      loaiThietBiID: Joi.string().length(24)
    }
  }
};
exports.default = { ...ThietBiVal
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, author, license, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"project-backend","version":"1.0.0","description":"","main":"index.js","scripts":{"start":"npm run build:server:once && npm-run-all --parallel run watch:server","build:server:once":"webpack --config webpack.config.js","run":"nodemon --inspect build.js","watch:server":"webpack --inline --progress --config webpack.config.js --watch"},"author":"","license":"ISC","dependencies":{"boom":"^7.3.0","config":"^3.0.1","hapi":"^17.8.4","hapi-pino":"^5.4.1","hapi-swagger":"^9.4.1","inert":"^5.1.2","joi":"^14.3.1","joi-objectid":"^2.0.0","lodash":"^4.17.11","mongoose":"^5.4.19","mongoose-paginate":"^5.0.3","nodemailer":"^6.1.0","nodemon":"^1.19.0","vision":"^5.4.4"},"devDependencies":{"@babel/core":"^7.3.4","babel-loader":"^8.0.5","babel-preset-env":"^1.7.0","cross-env":"^5.2.0","npm-run-all":"^4.1.5","webpack":"^4.29.6","webpack-cli":"^3.2.3","webpack-node-externals":"^1.7.2"}};

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\A\Documents\apidoan\app.js */"./app.js");


/***/ }),

/***/ "boom":
/*!***********************!*\
  !*** external "boom" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "hapi":
/*!***********************!*\
  !*** external "hapi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),

/***/ "hapi-swagger":
/*!*******************************!*\
  !*** external "hapi-swagger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-swagger");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "inert":
/*!************************!*\
  !*** external "inert" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inert");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "joi-objectid":
/*!*******************************!*\
  !*** external "joi-objectid" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi-objectid");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-paginate":
/*!************************************!*\
  !*** external "mongoose-paginate" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "vision":
/*!*************************!*\
  !*** external "vision" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vision");

/***/ })

/******/ });