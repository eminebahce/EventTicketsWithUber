"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var DefaultNamingStrategy_1 = require("typeorm/naming-strategy/DefaultNamingStrategy");
var StringUtils_1 = require("typeorm/util/StringUtils");
var entity_1 = require("./users/entity");
var CustomNamingStrategy = /** @class */ (function (_super) {
    __extends(CustomNamingStrategy, _super);
    function CustomNamingStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomNamingStrategy.prototype.tableName = function (targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : StringUtils_1.snakeCase(targetName) + 's';
    };
    CustomNamingStrategy.prototype.columnName = function (propertyName, customName, embeddedPrefixes) {
        return StringUtils_1.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    };
    CustomNamingStrategy.prototype.columnNameCustomized = function (customName) {
        return customName;
    };
    CustomNamingStrategy.prototype.relationName = function (propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    };
    return CustomNamingStrategy;
}(DefaultNamingStrategy_1.DefaultNamingStrategy));
exports["default"] = (function () { return typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
    entities: [
        entity_1["default"]
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
}).then(function () { return console.log('Connected to Postgres with TypeORM'); }); });
