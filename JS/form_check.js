function isEmpty (tekst) {
  if(tekst.length==0) {
    return true;
  }
  else {
    return false;
  }
}

function validate(formularz) {
  var validated = true;
  if(!checkStringAndFocus(formularz.elements["f_imie"],"Podaj imie!")){
    formularz.elements["f_imie"].className="wrong";
    validated = false;
  }
  if(!checkStringAndFocus(formularz.elements["f_nazwisko"],"Podaj nazwisko!")){
    formularz.elements["f_nazwisko"].className="wrong";
    validated = false;
  }
  if(!checkStringAndFocus(formularz.elements["f_kod"],"Podaj kod!")) {
    formularz.elements["f_kod"].className="wrong";
    validated = false;
  }
  if(!checkStringAndFocus(formularz.elements["f_ulica"],"Podaj ulice!")){
    formularz.elements["f_ulica"].className="wrong";
    validated = false;
  }
  if(!checkStringAndFocus(formularz.elements["f_miasto"],"Podaj miasto!")){
    formularz.elements["f_miasto"].className="wrong";
    validated = false;
  }
  if(!checkEmailRegEx(formularz.elements["f_email"].value)){
    formularz.elements["f_email"].className="wrong";
    validated = false;
  }
  if(validated==false) return false;
  return true;
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function checkString(str,msg){
  var sprawdzPusty = isEmpty(str);
  var sprawdzSpacje = isWhiteSpace(str);
  if(sprawdzPusty==true || sprawdzSpacje==true){
    alert(msg);
    return false;
  }
  else {
    return true;
  }
}

function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    } else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        } else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {

        document.getElementById(errorFieldName).innerHTML = msg;
        startTimer(errorFieldName);
        obj.focus();

        return false;
    } else {
        return true;
    }
}

var errorField = "";
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}

function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}

function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkZIPCodeRegEx(str) {
    var kodPocztowy = /^[0-9]{2}[-][0-9]{3}$/;
    if (kodPocztowy.test(str)) {
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return false;
    } else {
        document.getElementById("kod").innerHTML = "BAD";
        document.getElementById("kod").className = "red";
        return true;
    }
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

window.onload = function(){
	alterRows(1, document.querySelector("tbody tr"))
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}
