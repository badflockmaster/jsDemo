window.onload = function () {
    var stop = null;
    var items = document.querySelectorAll(".wrap ul li");
    var cancelID = new Array(items.length);
    for (var i = 0; i < items.length; i++) {
        cancelID[items[i].dataset.index - 1] = null;
        items[i].onmouseover = function () {
            var item2 = this;
            var index = item2.dataset.index - 1;
            if (item2.offsetWidth >= 600 || cancelID[index] !== null) {
                return;
            }
            cancelID[index] = requestAnimationFrame(function () {
                animation(item2, index);
            });
        };
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
            animation(item);
        });
        if (width >= 600) {
            cancelAnimationFrame(cancelID[index]);
            cancelID[index] = null;
        }
    }
};