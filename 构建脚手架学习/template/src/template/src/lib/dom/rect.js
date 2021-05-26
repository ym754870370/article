/**
 * 获取屏幕高度、位置的一些常用函数
 */

export const getScreenHeight = () => {
    return `${document.documentElement.clientHeight}px`;
};

export const getScreenWidth = () => {
    return `${document.documentElement.clientWidth}px`;
};

export const getNumber = (str) => {
    const newStr = str.replace(/px/g, '');
    const number = newStr ? parseFloat(newStr) : 0.0;
    return number;
};

export const elementOffset = (el) => {
    const elRect = el.getBoundingClientRect();
    const newElRect = {
        elLeft: elRect.top,
        elRight: elRect.left + getNumber(el.style.width) + getNumber(el.style.paddingLeft) + getNumber(el.style.paddingRight),
        elBottom: elRect.top + getNumber(el.style.height) + getNumber(el.style.paddingTop) + getNumber(el.style.paddingBottom),
    };
    return Object.assign({}, elRect, newElRect);
};

export const getComputedStyle = (ele, pseudoElt = null) => {
    console.log(ele);
    if (window.getComputedStyle && ele) {
        return window.getComputedStyle(ele, pseudoElt);
    };
    return {};
};
