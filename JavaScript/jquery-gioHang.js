function layThongTinDuLich() {

    // lay id tren query string

     
    // lay query string tu url
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());

    // END lay query string tu url


     // params[ daSplit[0] ] = daSplit[1]   ~ params[ "id" ] = 1


// var newParam = { id: 1 };


    var id = params.id;
    var loai = params.loai;
    var ngay = params.ngay;

    var idInt = parseInt(id);
    var loaiInt = parseInt(loai);
    var ngayInt = parseInt(ngay);
   

    // data la kieu string
    
    // var dataString = localStorage.getItem("dataAll");

    var dataString = null;

    if(loaiInt === 1)
    {
        console.log("dataStored");
        dataString = localStorage.getItem("dataStored");
    }

    if(loaiInt === 2)
    {
        console.log("dataTN");
        dataString = localStorage.getItem("dataTN");
    }

    if(loaiInt === 3)
    {
        console.log("dataNN");
        dataString = localStorage.getItem("dataNN");
    }

   

    // chuyen data => javascript object/array
    var data = JSON.parse(dataString);

    var duLichItem = data.find(d => d.id === idInt);


    console.log(duLichItem);

    // {startDayId: 2, startDay: "11/08/2022"},
    var startDateItem = duLichItem.startDayList.find(x => x.startDayId === ngayInt); // [ {} {} {} ]


// Phần thay đổi thông tin 
    // Sản phẩm hot
    // thay doitieu de
    $("#NameTrip").text(duLichItem.title);

    // Thay đổi ngày tháng
    //$("#dateTrip").text(duLichItem.startDay);
    $("#dateTrip").text(startDateItem.startDay);

    // thay doi anhdai dien
    $("#anhDaiDien").attr("src",duLichItem.img);

    // Thay đổi giá tiền khi nhân
    $("#price-multiplier").text("x " + duLichItem.priceNoVND + " =")

    // Thay đổi giá tiền
    $.each($(".total-item2"), function (){
        $(this).text(duLichItem.price)
    })

    // Phần xử lý tính tiền
}




function tinhTien() {

    // lay query string tu url
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    // END lay query string tu url

    var id = params.id;
    var loai = params.loai;
    var idInt = parseInt(id);
    var loaiInt = parseInt(loai);


    var dataString = null;

    if(loaiInt === 1)
    {
        console.log("dataStored");
        dataString = localStorage.getItem("dataStored");
    }

    if(loaiInt === 2)
    {
        console.log("dataTN");
        dataString = localStorage.getItem("dataTN");
    }

    if(loaiInt === 3)
    {
        console.log("dataNN");
        dataString = localStorage.getItem("dataNN");
    }

    // chuyen data => javascript object/array
    var data = JSON.parse(dataString);

    var duLichItem = data.find(d => d.id === idInt);


    // Phần xử lý chuyển só có chấm thành không chấm
    var priceString = duLichItem.priceNoVND;

    var priceArr = priceString.split(".");

    var priceKhongCham = "";
    for (var i = 0; i < priceArr.length; i++) {
        priceKhongCham += priceArr[i];
        
    }

    var priceNoVNDInt = parseInt(priceKhongCham); 
    


    // Phần xử lý tính tiền
    var soLuongKhach = document.getElementById("soLuongKhach").value;

    var tongTinhToan = soLuongKhach * priceNoVNDInt;

    // chuyen ve chuoi tongTinhToan
    var tongTinhToanString = tongTinhToan.toString();


    var tongCoChamNguoc = '';
    var dem = 0;


    // chay vong lap for 3 so cham 1 cai
    for (var i = tongTinhToanString.length - 1; i >= 0; i--) {
        
        var so = tongTinhToanString[i];

        dem = dem + 1;
        if(dem === 3){
            tongCoChamNguoc = tongCoChamNguoc + so + ".";

            dem = 0;
        } else{
            tongCoChamNguoc = tongCoChamNguoc + so
        }
        
    }

    var tongCoCham = '';

    for (var i = tongCoChamNguoc.length - 1; i >= 0; i--) {
        var so = tongCoChamNguoc[i];
        tongCoCham = tongCoCham + so;
    }

    return tongCoCham;

    // var tongTienHienThi = tongCoCham + " VND";

    // document.getElementById("total-item").innerHTML = tongTienHienThi;
    // document.getElementById("total").innerHTML = tongTienHienThi;
    // document.getElementById("total1").innerHTML = tongTienHienThi;
}

function tinhTienVaHienThiSoTien() {
    var tongTien = tinhTien();

    var tongTienHienThi = tongTien + " VND";

    document.getElementById("total-item").innerHTML = tongTienHienThi;
    document.getElementById("total").innerHTML = tongTienHienThi;
    document.getElementById("total1").innerHTML = tongTienHienThi;
}




$(document).ready(function() {
    layThongTinDuLich();
    tinhTienVaHienThiSoTien();
})

// Phần xử lý nhập thông tin đặt chuyến đi
function Validator(options) {

    var selectorRules = {};

    // Hàm hiện lỗi khi có lỗi
    function validate_error(inputElement, rule) {
        var LoiCanHienThi = inputElement.parentElement.querySelector('.error')
        var LoiTin;      
       
       
        // Lấy ra các rule
        var rules = selectorRules[rule.selector];


        // Lập qua từng rule
        for (var i = 0; i < rules.length; ++i) {
            LoiTin = rules[i](inputElement.value);
            if (LoiTin) break;
        }
        
        if (LoiTin) {
            LoiCanHienThi.innerText = LoiTin;
        } else {
            LoiCanHienThi.innerText = '';
        }

    }

    // Lấy toàn bộ form
    var formElement = document.querySelector(options.form);
    if (formElement) {

        // Xử lý lặp rule
        options.rules.forEach(function (rule) {

            // Lưu lại các rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            


            // Lấy được giá trị người dùng nhập vào qua inputElement.value
            var inputElement = formElement.querySelector(rule.selector);
            var errorSpan = inputElement.parentElement.querySelector(options.errorSelector);
            
            if (inputElement) {
                // khi người dùng không nhập dữ liệu
                inputElement.onblur = function () {
                    validate_error(inputElement, rule);
                }

                // Khi người dùng nhập dữ liệu
                inputElement.oninput = function () {
                    errorSpan.innerText = '';
                }
            }
        });

    }
}



// Định nghĩa các rules
// Khi có lỗi thì báo cho người dùng lỗi
// Không có lỗi thì bình thường
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            // trim() : loại bỏ các dấu cách hay khoảng trắng đầu dòng
            return value.trim() ? undefined : message || 'Vui lòng nhập thông tin này'
        }
    };
}

// Biểu thức kiểm tra email: var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email'
        }
    };
}

// Biểu thức kiểm tra số điện thoại: var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
Validator.isNumber = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var vnf_regex = /((01|02|03|04|05|06|07|08|09)+([0-9]{8})\b)/g;
            return vnf_regex.test(value) ? undefined : message || 'Vui lòng nhập đúng số điện thoại'
        }
    };
}

Validator.isAddress = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập địa chỉ'
        }
    };
}

$(document).ready(function() {
    $("#submit").click(function() {

        // lay query string tu url
        var urlSearchParams = new URLSearchParams(window.location.search);
        var params = Object.fromEntries(urlSearchParams.entries());
        // END lay query string tu url

        var id = params.id;
        var loai = params.loai;
        var idInt = parseInt(id);
        var loaiInt = parseInt(loai);


        var dataString = null;

        if(loaiInt === 1)
        {
            console.log("dataStored");
            dataString = localStorage.getItem("dataStored");
        }

        if(loaiInt === 2)
        {
            console.log("dataTN");
            dataString = localStorage.getItem("dataTN");
        }

        if(loaiInt === 3)
        {
            console.log("dataNN");
            dataString = localStorage.getItem("dataNN");
        }

        // chuyen data => javascript object/array
        var data = JSON.parse(dataString);

        var duLichItem = data.find(d => d.id === idInt);

        // Lấy thông tin
        var name = duLichItem.title;
        var time = duLichItem.startDay;
        var price = duLichItem.price;

    
        var fullName = $("#fullName").val();
        var number = $("#phoneNumber").val();
        var email = $("#email").val();
        var address = $("#address").val();

        var tongTIen = tinhTien();

        if (fullName === " " || number === " " || email === "" || address === "") {
            alert('Vui lòng nhập thông tin đầy đủ');
        } else {
            $("div.modal").show();

            $("div.PageSubmit-main").prepend(`
            <div class="ThongTinKhachHang action">
                <div class="title1">
                    <h2>THÔNG TIN KHÁCH HÀNG</h2>
                    <ul>
                    <li>
                        Tên khách hàng: 
                        <span>${fullName}</span>
                    </li>
                    <li>
                        Số điện thoại:
                        <span> ${number}</span>
                    </li>
                    <li>
                        Gmail:
                        <span> ${email}</span>
                    </li>
                    <li>
                        Địa chỉ:
                        <span> ${address}</span>
                    </li>
                    <li>
                       <h2>${name}</h2>
                    </li>
                    <li>
                        Ngày khởi hành:
                        <span>${time}</span>
                    </li>
                    <li>
                        Tổng tiền:
                        <span>${tongTIen} VND</span>
                    </li>
                    </ul>
                    <button class="submit-XacNhan" onclick="submitDatTour()">Xác Nhận</button>
                    <label class="daux" > 
                                    <i class="fas fa-times" onclick="xoaBang()"></i>
                    </label>
                </div>
                
            </div>
            `)
        }  
    })

    
})

function clearModal(){
    $("div.modal").hide();
    $(".ThongTinKhachHang").remove();

    // clear input
    $("#fullName").val('');
    $("#phoneNumber").val('');
    $("#email").val('');
    $("#address").val('');
}

function submitDatTour() {
    clearModal();
    var confirmBtn = confirm('Bạn chắc là muốn đặt chuyến chứ!!!!')
    if (confirmBtn == true) {
        alert('Bạn đã đặt tour thành công ^_^')
    } else {
        clearModal();
    }
    
}

function xoaBang() {
    $("div.modal").hide();
    $(".ThongTinKhachHang").remove();
}