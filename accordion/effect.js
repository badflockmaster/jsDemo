window.onload = function () {
    var items = document.querySelectorAll(".wrap ul li");
    var cancelID = new Array(items.length);
    var stopID = new Array(items.length);
    for (var i = 0; i < items.length; i++) {
        cancelID[items[i].dataset.index - 1] = null;
        stop[items[i].dataset.index - 1] = null;
        items[i].onmouseover = function () {
            var item2 = this;
            var index = item2.dataset.index - 1;
            if (item2.offsetWidth >= 600 || cancelID[index] !== null) {
                // 结束其他正在执行的动画，同时减小其width至200px
                return;
            }
            if(items[0].offsetWidth === 600) {
                items[0].onmouseout();
            }
            if(stopID[index] !== null) {
                cancelAnimationFrame(stopID[index]);
                stopID[index] = null;
            }
            cancelID[index] = requestAnimationFrame(function () {
                animation(item2, index);
            });
        };

        items[i].onmouseout = function () {
            var item2 = this;
            var index = item2.dataset.index - 1;
            if(item2.offsetWidth <= 200) {
                return;
            }
            if(cancelID[index] !== null) {
                cancelAnimationFrame(cancelID[index]);
                cancelID[index] = null;
            }
            stop[index] = requestAnimationFrame(function () {
                cancelAnimation(item2, index);
            })
        }
    }
    // 编写动画函数
    function animation(item, index) {
        // 设置item的初始width
        var past_width = item.offsetWidth;
        item.style.width = past_width + "px";
        var width = parseInt(item.style.width);
        width += 5;
        item.style.width = width + "px";
        cancelID[index] = requestAnimationFrame(function () {
            animation(item, index);
        });
        if (width >= 600) {
            item.style.width = 600 + "px";
            cancelAnimationFrame(cancelID[index]);
            cancelID[index] = null;
        }
    }

    function cancelAnimation(item, index) {
        // 设置item的初始width
        var past_width = item.offsetWidth;
        item.style.width = past_width + "px";
        var width = parseInt(item.style.width);
        width -= 5;
        item.style.width = width + "px";
        stopID[index] = requestAnimationFrame(function () {
            cancelAnimation(item, index);
        });
        if (width <= 200) {
            item.style.width = 200 + "px";
            cancelAnimationFrame(stopID[index]);
            stopID[index] = null;
        }
    }
};