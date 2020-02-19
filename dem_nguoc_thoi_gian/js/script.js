var hour = 0;
var minute = 0;
var second = 0;
var countdown;

var txtHour, txtMinute, txtSecond;
var lblHour, lblMinute, lblSecond;
var btnStart, btnPause, btnStop;

// Sự kiện load của window: Lấy các thành phần HTML gán vào các biến JS
window.onload = function () {
    txtHour = document.getElementById("txtHour");
    txtMinute = document.getElementById("txtMinute");
    txtSecond = document.getElementById("txtSecond");

    lblHour = document.getElementById("lblHour");
    lblMinute = document.getElementById("lblMinute");
    lblSecond = document.getElementById("lblSecond");

    btnStart = document.getElementById("btnStart");
    btnPause = document.getElementById("btnPause");
    btnStop = document.getElementById("btnStop");
}

function Start() {
    // Lấy thông tin giờ, phút, giây người dùng nhập vào 3 textbox
    if (!GetInput()) {
        return;
    }

    // Chuyển giờ, phút, giây về dạng chuẩn (nếu phút, giây >= 60)
    if (second >= 60) {
        minute += parseInt(second / 60);
        second = second % 60;
    }
    if (minute >= 60) {
        hour += parseInt(minute / 60);
        minute = minute % 60;
    }
    ShowCurrentTime();

    // Khởi động bộ đếm ngược
    if (!CheckTimeRunOut()) {
        countdown = setInterval(Countdown, 1000);
        StartUI();
    }
}

function Pause() {
    // Ghi chép lại giờ, phút, giây hiện tại vào 3 textbox
    txtHour.value = hour;
    txtMinute.value = minute;
    txtSecond.value = second;

    // Xóa bộ đếm ngược
    clearInterval(countdown);

    // Mở khóa nút Bắt đầu, khóa nút Tạm dừng
    btnStart.disabled = false;
    btnPause.disabled = true;
}

function Stop() {
    if (confirm("Bạn có chắc muốn kết thúc bộ đếm ngược?")) {
        // Xóa bộ đếm ngược
        clearInterval(countdown);

        // Reset giờ, phút, giây về 0
        hour = 0;
        minute = 0;
        second = 0;

        // Hiển thị giờ, phút, giây hiện tại
        ShowCurrentTime();
        StopUI();
    }
}

function Countdown() {
    // Nếu thời gian đã chạy hết thì xóa bộ đếm, thông báo và mở khóa nút Bắt đầu, khóa nút Tạm dừng và Kết thúc, hiện textbox, ẩn label
    if (CheckTimeRunOut()) {
        clearInterval(countdown);
        var audio = new Audio("assets/bellring.mp3");
        audio.loop = true;
        audio.play();
        alert("Hết giờ!");
        audio.pause();
        StopUI();
    }
    // Ngược lại, giảm 1 giây và hiển thị giờ, phút, giây hiện tại
    else {
        Subtract1Second();
        var audio = new Audio("assets/tick.mp3");
        audio.play();
        ShowCurrentTime();
    }
}

// Hàm: Lấy và kiểm tra dữ liệu nhập
function GetInput() {
    hour = Number(txtHour.value);
    minute = Number(txtMinute.value);
    second = Number(txtSecond.value);
    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        alert("Vui lòng chỉ nhập số nguyên dương");
        return false;
    }
    if (hour < 0 || minute < 0 || second < 0) {
        alert("Vui lòng chỉ nhập số nguyên dương");
        return false;
    }
    return true;
}

// Hàm: Kiểm tra xem đã hết giờ chưa
function CheckTimeRunOut() {
    return hour == 0 && minute == 0 && second == 0;
}

// Hàm: Giảm 1 giây
function Subtract1Second() {
    second--;
    if (second < 0) {
        second = 59;
        minute--;
    }
    if (minute < 0) {
        minute = 59;
        hour--;
    }
}

// Hàm: Hiển thị giờ, phút, giây hiện tại
function ShowCurrentTime() {
    lblHour.innerHTML = AddLeadingZero(hour);
    lblMinute.innerHTML = AddLeadingZero(minute);
    lblSecond.innerHTML = AddLeadingZero(second);

    txtHour.value = hour;
    txtMinute.value = minute;
    txtSecond.value = second;
}

// Hàm: Hiển thị UI chạy bộ đếm
function StartUI() {
    // Khóa nút Bắt đầu, mở khóa nút tạm dừng và Kết thúc
    btnStart.disabled = true;
    btnPause.disabled = false;
    btnStop.disabled = false;

    // Ẩn textbox, hiện label
    document.getElementById("lstTxt").style.display = "none";
    document.getElementById("lstLbl").style.display = "block";
}

// Hàm: Hiển thị UI kết thúc bộ đếm
function StopUI() {
    // Mở khóa nút Bắt đầu, khóa nút Tạm dừng và Kết thúc
    btnStart.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled = true;

    // Hiện textbox, ẩn label
    document.getElementById("lstTxt").style.display = "block";
    document.getElementById("lstLbl").style.display = "none";
}

// Hàm: Bổ sung thêm chữ số 0 cho các giờ, phút, giây có 1 chữ số
function AddLeadingZero(number) {
    if (number >= 0 && number <= 9) {
        return "0" + number;
    }
    return number;
}