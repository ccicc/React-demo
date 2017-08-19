// 手机滑动事件封装

function touchFunc(element, type, callback) {
    const init = { x: 5, y: 5, sx: 0, sy: 0, ex: 0, ey: 0 };
    let stime = 0;
    let etime = 0;
    type = type.toLowerCase();

    element.addEventListener('touchstart', (event) => {
        stime = new Date().getTime();
        init.sx = event.targetTouches[0].pageX;
        init.sy = event.targetTouches[0].pageY;
        init.ex = init.sx;
        init.ey = init.sy;
        if (type.indexOf('start') !== -1)callback();
    }, false);

    element.addEventListener('touchmove', (event) => {
        init.ex = event.targetTouches[0].pageX;
        init.ey = event.targetTouches[0].pageY;
        if (type.indexOf('move') !== -1)callback();
    }, false);

    element.addEventListener('touchend', () => {
        const changeX = init.ex - init.sx;
        const changeY = init.ey - init.sy;
        if (Math.abs(changeX) < init.x && Math.abs(changeY) < init.y) {
            // 点击事件限定在 5 * 5 范围内
            etime = new Date().getTime();
            // 长按和点击事件区分
            if ((etime - stime) > 300) {
                if (type.indexOf('long') !== -1)callback();
            } else {
                if (type.indexOf('click') !== -1)callback();
            }
        } else if (Math.abs(changeX) - Math.abs(changeY) && Math.abs(changeY) > init.y) {
            // 左右滑动
            if (changeX > 0) {
                if (type.indexOf('right') !== -1)callback();
            } else {
                if (type.indexOf('left') !== -1)callback();
            }
        } else if (Math.abs(changeY) > Math.abs(changeX) && Math.abs(changeX) > init.x) {
            // 上下滑动
            if (changeY > 0) {
                if (type.indexOf('top') !== -1)callback();
            } else {
                if (type.indexOf('down') !== -1)callback();
            }
        }
        if (type.indexOf('end') !== -1)callback();
    }, false);
}

export default touchFunc;
