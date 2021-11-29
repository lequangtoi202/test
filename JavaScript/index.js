var x = 1;
changeImg = function() {
    var imgs = ["imgs/img-QC/anh-QC.png", "imgs/img-QC/anh0.jpg", "imgs/img-QC/anh1.jpg", "imgs/img-QC/anh2.jpg", "imgs/img-QC/anh3.jpg", "imgs/img-QC/anh4.jpg", "imgs/img-QC/anh5.jpg", "imgs/img-QC/anh6.jpg", "imgs/img-QC/anh7.jpg"]
    document.getElementById('img').src = imgs[x]
    x++;
    if (x == 9)
    {
        x = 0;
    }
}
setInterval(changeImg, 5000);


// Phần trượt và tăng số 
var yearTimer = null;
var peopleTimer = null;
var tripTimer = null;
$(document).ready(function() {
    var year = $("#year")
    var people = $("#people")
    var trip = $("#trip")

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 4300) {
            if (yearTimer === null)
                yearTimer = inc(year, 3, 30, "year")
            if (peopleTimer === null)
                peopleTimer = inc(people, 100000, 1000000, "people")
            if (tripTimer === null)
                tripTimer = inc(trip, 100, 1000, "trip")
        }
    })
})
function inc(el, steps, max, type) {
    var value = parseInt(el.text())
    return setInterval(function() {
        value += steps;
        if (value <= max) {
            el.text(value)
        } else {
            if (type === "year")
                clearInterval(yearTimer)
            else if (type === "people")
                clearInterval(peopleTimer)
            else if (type="trip")
                clearInterval(tripTimer)
        }
    }, 100)
}

//Phần chuyển đổi ảnh
function init() {
    var imgs = document.querySelectorAll("div.TripInfo-img-items img")
    for (var i = 0; i < imgs.length; i++)
        imgs[i].onclick = function() {
            var path = this.src;
            var img = document.getElementById("mainImg");
            img.setAttribute("src", path)
        }
}



