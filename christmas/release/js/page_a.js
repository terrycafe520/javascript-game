/**
 * 第一副场景页面
 * http://louisremi.github.com/jquery.transform.js/index.html
 * http://www.html5tricks.com/demo/html5-css3-car-animation/index.html
 * http://www.gbtags.com/gb/demoviewer/4387/c9ebbe12-abab-487d-958a-aa79797ddcda/snow.html.htm
 */

function PageA() {
    //根元素
    this.$root= $(".page-a");
    //小男孩
    this.$boy = $(".chs-boy");

    this.createCloudyCircle();
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
PageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.animate({
        "left": options.left,
        "top" : options.top,
        "transform": "scale(" + options.scale + ")"
    }, options.time, function() {
        dfd.resolve()
    });
    return dfd;
}


/**
 * 停止走路
 * @return {[type]} [description]
 */
PageA.prototype.stopWalk = function(){
    this.$boy.addClass("boy-stop-animate")
}

//http://www.html5tricks.com/demo/pure-css3-weather-icon/index.html
  
/**
 * 跑步
 * @return {[type]} [description]
 */
PageA.prototype.run = function(){
    return 
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)

    next({
        "top"   : "-0.2rem",
        "scale" : 0.6,
        "time"  : 4000
    }).
    then(function() {
        that.$boy.css("z-index",10);
        return next({
            "left"    : "5rem",
            "top"     : "2em",
            "scale"   : 0.7,
            "time"    : 2000
        })
    }).
    then(function() {
        return next({
            "left"  : "3rem",
            "top"   : "5em",
            "scale" : 0.8,
            "time"  : 2000
        })
    }).
    then(function() {
        return next({
            "left"  : "6rem",
            "top"   : "7em",
            "scale" : 1,
            "time"  : 2000
        })
    }).
    then(function(){
        that.stopWalk();
    })

}


/**
 * 创建半圆的云svg图
 * @return {[type]} [description]
 */
PageA.prototype.createCloudyCircle = function() {
    return
    //创建SVG元素
    var svg = document.createElement("svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    //创建circle元素
    var rect = document.createElement("rect");
    rect.setAttribute("cx", "50");
    rect.setAttribute("cy", "50");
    rect.setAttribute("r", "40");
    svg.appendChild(rect);
    $root.append(svg); 
}

 


/**
 *  css3关键帧算法
 * @param {[type]} row   [description]
 * @param {[type]} col   [description]
 * @param {[type]} count [description]
 */
function calculationKeyframes(col, row, count) {
    //矩阵生成step的处理
    //  0 1 2
    //  3 4 5
    //  6 7 8
    var keyframes = [];
    var base = 100 / count;
    //首次
    keyframes.push(0 + '% { background-position:0% 0%}')
    for (var i = 0; i < count; i++) {
        //当前行数
        var currRow = Math.ceil((i + 1) / col); //当前行数
        var currCol = Math.floor(i / col); //当前列数  
        var period = currCol * col; //每段数量  
        var x = 100 * (i - period)
        var y = 100 * currCol;
        x = x == 0 ? x : "-" + x;
        y = y == 0 ? y : "-" + y;
        keyframes.push(((i + 1) * base) + '% { background-position: ' + y + '% ' + x + '%}')
    }
    return keyframes.join("")
}