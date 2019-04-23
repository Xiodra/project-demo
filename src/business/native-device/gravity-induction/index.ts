let SHAKE_THRESHOLD = 8;
let last_update = 0;
let x, y, z, last_x = 0, last_y = 0, last_z = 0;
let num = 0;
function deviceMotionHeadler(eventData: any) {
    // accelerationIncludingGravity(包括重心引力，Z轴方向加了9.8，在X方向上的值两者相同)重力加速度
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    // 300ms后更新，提高性能
    if ((curTime - last_update) > 300) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        // 判断为摇动，而不是手抖或其他的条件
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 100;
        if (speed > SHAKE_THRESHOLD) {
            num++;
            alert(num);
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
export function gravityInduction() {
    window.addEventListener('devicemotion', deviceMotionHeadler, false);
}