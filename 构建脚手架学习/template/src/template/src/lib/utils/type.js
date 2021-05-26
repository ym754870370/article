/**
 * @desc 判断字段类型
 */

export const isType = (val, type) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
};

export const isArray = val => {
    return isType(val, 'Array');
};

export const isObject = val => {
    return isType(val, 'Object');
};

export const isNumber = val => {
    return isType(val, 'Number');
};

export const isNull = obj => Object.keys(obj).length === 0;
