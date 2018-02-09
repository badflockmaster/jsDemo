window.onload = function () {
  var wrap = document.getElementById("wrap");
  var display = document.querySelector("#display");
  var content = document.querySelector("#content");
  var first = document.querySelector("#first-line");
  var keys = wrap.getElementsByTagName("div");
  var equal = document.getElementById("equal");
  var del = document.querySelector("#del");
  var percent = document.querySelector("#percent");

  percent.onclick = keyClick;
  del.onclick = function () {
    first.innerText = first.innerText.substring(0, first.innerText.length - 1);
  };

  equal.onclick = function () {
    var text = first.innerHTML.replace(/[<br>]/g, "");
    var new_text = "";
    var flag = true;
    if(text.length <= 24) {
      new_text = text ;
    } else {
      for(var i = 0, j = 24; j <= text.length ;) {
      new_text += text.substring(i, j) + "<br>";
      i = j + 1;
      if(j * 2 >= text.length && flag) {
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
    }
    // set the bottom size of the content area
    content.style.bottom = first.offsetHeight + "px";
  }

  //evaluate the result according to the expression
  function result(expression) {
    
  }
};