window.onload = function () {
  var wrap = document.getElementById("wrap");
  var content = document.querySelector("#content");
  var first = document.querySelector("#first-line");
  var keys = wrap.getElementsByTagName("div");
  var equal = document.getElementById("equal");
  var del = document.querySelector("#del");
  var percent = document.querySelector("#percent");
  var old_fSize = parseInt(window.getComputedStyle(first).fontSize);
  var new_fSize = parseInt(window.getComputedStyle(first).fontSize);
  var toggle_pn = document.querySelector("#toggle-pn");

  // plus turn into minus and minus turn into plus
  toggle_pn.onclick = function() {
    first.innerText  = first.innerText.replace(/[-+]/g, function(match, pos, originalText) {
      if(match === "-") {
        return "+";
      } else {
        return "-";
      }
    })
  };
  percent.onclick = keyClick;
  del.onclick = function () {
    first.innerText = first.innerText.substring(0, first.innerText.length - 1);
  };

  equal.onclick = function () {
    new_fSize = old_fSize;
    first.style.fontSize = old_fSize + "px";
    var text = first.innerHTML.replace(/[<br>]/g, "");
    text = convert_per(text);
    text = result(text);
    var new_text = "";
    var flag = true;
    if (text.length <= 24) {
      new_text = text;
    } else {
      for (var i = 0, j = 24; j <= text.length;) {
        new_text += text.substring(i, j) + "<br>";
        i = j + 1;
        if (j * 2 >= text.length && flag) {
          j = text.length;
          flag = false;
        } else {
          j *= 2;
        }
      }
    }
    content.innerHTML += new_text + "<br><br>";
    first.style.fontSize = parseInt(window.getComputedStyle(first).fontSize) - 26 + "px";
    first.style.opacity = parseInt(window.getComputedStyle(first).opacity) - 1;
    setTimeout(function () {
      first.innerText = "";
      first.style.fontSize = parseInt(window.getComputedStyle(first).fontSize) + 26 + "px";
      first.style.opacity = parseInt(window.getComputedStyle(first).opacity) + 1;
      // set the bottom size of the content area
      content.style.bottom = first.offsetHeight + "px";
    }, 300);
  };

  // set click events for every key
  for (var i = 7; i < keys.length - 1; i++) {
    keys[i].onclick = keyClick;
  }

  function keyClick() {
    var value = this.innerText;
    if ((first.innerText.length + 1) % 13) {
      first.innerText = first.innerText + value;
    } else {
      first.innerHTML += "<br>" + value;
      if (new_fSize > 20) {
        new_fSize -= 8;
        first.style.fontSize = new_fSize + "px";
      }
    }
    // set the bottom size of the content area
    content.style.bottom = first.offsetHeight + "px";
  }

  //evaluate the result according to the expression
  function result(expression) {
    //divide expression into numbers and operations
    var num = expression.split(/[-+÷×]/g);
    var operations = expression.split(/\d+\.?\d*/g);
    var pre_num, next_num;
    var minus_sign = false;
    if (operations[0] === "-") {
      minus_sign = true;
      operations.splice(0, 1);
      operations.replace(/[-+]/g, function (match, pos, originalText) {
        switch (match) {
          case "-": {
            return "+";
          }
          case "+": {
            return "-";
          }
        }
      });
    }
    num = del_empty(num);
    operations = del_empty(operations);
    for (var i = 0; i < operations.length; i++) {
      pre_num = parseFloat(num[i]);
      next_num = parseFloat(num[i + 1]);
      if (operations[i] === "×" || operations[i] === "÷") {
        if (operations[i] === "÷") {
          num[i] = pre_num / next_num + "";
        } else {
          num[i] = pre_num * next_num + "";
        }
        num.splice(i + 1, 1);
        operations.splice(i, 1);
        i--;
        console.log(num, operations);
      }
    }
    while (num.length !== 1) {
      if (operations[0] === "+") {
        num[0] = parseFloat(num[0]) + parseFloat(num[1]) + "";
      } else {
        num[0] = parseFloat(num[0]) - parseFloat(num[1]) + "";
      }
      num.splice(1, 1);
      operations.splice(0, 1);
    }
    if (minus_sign) {
      return "-" + num.toString();
    }
    return num.toString();
  }

  // deletes an empty character in an Array
  function del_empty(arr) {
    return arr.filter(function (item, index, array) {
      return (item !== "" && item !== undefined);
    })
  }

  // convert a percent sign to a decimal
  function convert_per(expression) {
    return expression.replace(/\d+\.?\d*%/g, function (match, pos, originalText) {
      return parseInt(match) / 100;
    })
  }
};