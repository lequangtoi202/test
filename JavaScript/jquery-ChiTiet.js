function layThongTinDuLichChiTiet() {

    // lay id tren query string


    // lay query string tu url
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());

    // END lay query string tu url


    var id = params.id;
    var loai = params.loai;
    var idInt = parseInt(id);
    var loaiInt = parseInt(loai);



    // data la kieu string

    var dataString = null;

    if (loaiInt === 1) {
        console.log("dataStored");
        dataString = localStorage.getItem("dataStored");
    }

    if (loaiInt === 2) {
        console.log("dataTN");
        dataString = localStorage.getItem("dataTN");
    }

    if (loaiInt === 3) {
        console.log("dataNN");
        dataString = localStorage.getItem("dataNN");
    }

    // chuyen data => javascript object/array
    var data = JSON.parse(dataString);

    var duLichItem = data.find(d => d.id === idInt);


    // var imgListHTML = "";

    var list = duLichItem.imgList;
    var DayList = duLichItem.startDayList;
    console.log(duLichItem);


    $("#btnDayNgay").click(function(){
        // alert(123);
        window.location.href = `/index-gioHang.html?id=${id}&loai=${loai}&ngay=${DayList[0].startDayId}`;

    })


    // Phần thay đổi thông tin 
    // Thay đổi ảnh nền
    $("#anhNen").attr("src", duLichItem.anhNen);

    // thay doi tieu de
    $("#NameTripCT").text(duLichItem.title);

    // Thay đổi ngày tháng
    $("#dateTrip").text(duLichItem.startDay);
    $("#numberDay").text(duLichItem.numberDay);
   
    // thay doi anhdai dien
    $("#mainImg").attr("src", duLichItem.img);
    $("#img1").attr("src", list[0].img);
    $("#img2").attr("src", list[1].img);
    $("#img3").attr("src", list[2].img);
    $("#img4").attr("src", list[3].img);

    // Thay đổi mã tour
    $("#TourCode").text("Mã tour: " + duLichItem.maTour);
    $.each($(".maCode"), function () {
        $(this).text(duLichItem.maTour)
    });

    // Thay đổi địa chỉ khởi hành
    $("#addressStar").text(duLichItem.address);

    // Thay đổi giá tiền
    $.each($(".total-item2"), function () {
        $(this).text(duLichItem.price)
    });


    // For startDayList

    var startDayListTable = $(".NgayKhac #startDayList");

    console.log("startDayListTable");
    console.log(startDayListTable);

    var dayListTableHTML = `
    <table  border="1">
                            <thead>
                                    <th>Mã tour</th>
                                    <th>Ngày khởi hành</th>
                                    <th>Giá</th>
                                    <th></th>
                                </thead>
                                <tbody>`;

    

    for (var index = 0; index < DayList.length; index++) {
        const dayItem = DayList[index];
        
    console.log("dayItem");
    console.log(dayItem);
        // TODO lap startDayList va dien du lieu
            dayListTableHTML += `
            <tr>
                    <td class="maCode">${duLichItem.maTour}${dayItem.startDayId}</td>
                    <td class="startDay2">${dayItem.startDay}</td>
                    <td class="total-item2">${duLichItem.price}</td>
                    <td>
                        <div>
                            <input class="btn" onClick="datNgayKhacClick(${id}, ${loai}, ${dayItem.startDayId})" type="button" value="Đặt ngay">
                        </div>
                    </td>
                </tr>
            `
    }



    dayListTableHTML += `</tbody>
        </table>`


    console.log("dayListTableHTML");
    console.log(dayListTableHTML);

    startDayListTable.html(dayListTableHTML);

    // neu xai class thì se co nhieu thang, lay thang dau tien
    // startDayListTable[0].html(dayListTableHTML);

}


function datNgayChiTietClick() {

    console.log("datNgayClick");


    // lay query string tu url
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    // END lay query string tu url

    var id = params.id;
    var loai = params.loai;
    // lay id
    // lay loai
    console.log(id);
    console.log(loai);

    var duLichItem = data.find(d => d.id === idInt);

    var ngayDauTien = duLichItem.startDayList[0];

    // var item = $(this);

    // loai 1 => data
    // loai 2 => trong nuoc
    // loai 3 => ngoai nuoc

    // window.location.href = "/index-gioHang.html?id=" + id;
    window.location.href = `/index-gioHang.html?id=${id}&loai=${loai}&ngay=${ngayDauTien.startDayId}`;
}

function datNgayKhacClick(id,loai,ngay) {

    // window.location.href = "/index-gioHang.html?id=" + id;
    window.location.href = `/index-gioHang.html?id=${id}&loai=${loai}&ngay=${ngay}`;
}

$(document).ready(function () {
    layThongTinDuLichChiTiet();
})