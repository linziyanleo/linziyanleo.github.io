    var menubox = document.getElementById("area"); 
    var cli_on = document.getElementById("on"); 
    var flag = false, timer = null, initime = null, r_len = -400;
 
    if(menubox.style.right=== 0){
        flag = false;
    }else{
        flag = true;
    }
    cli_on.onclick = function () {
        clearTimeout(initime);
        if (flag) {
            r_len = 0;
            timer = setInterval(slideright, 10);
        }else{
            r_len = -400;
            timer = setInterval(slideleft, 10);
        }
    }
    //Expand
    function slideright() {
        if (r_len <= -360) {
            clearInterval(timer);
            flag = !flag;
            return false;
        }else{
            r_len -= 18;
            menubox.style.right = r_len + 'px';
        }
    }
    //Get back
    function slideleft() {
        if (r_len >= 0) {
            clearInterval(timer);
            flag = !flag;
            return false;
        } else {
            r_len += 18;
            menubox.style.right = r_len + 'px';
        }
    }