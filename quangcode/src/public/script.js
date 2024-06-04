function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  var token = getCookie("token");
  console.log(token);

  if (token) {
    const welcome = document.getElementById("welcome");
    welcome.querySelector("h1").textContent =
      "Chao mung ban den voi trang web cua chung toi";
    document.querySelector("main").style.display = "block";
    welcome.querySelector("a").style.display = "none";
  } else {
    const welcome = document.getElementById("welcome");
    welcome.querySelector("h1").textContent =
      "Ban chua dang nhap, vui long dang nhap de tiep tuc";
    document.querySelector("main").style.display = "none";
    welcome.querySelector("a").style.display = "block";
  }