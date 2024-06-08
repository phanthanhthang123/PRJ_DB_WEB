//Đảm bảo rằng script chạy sau khi DOM tải xong
document.addEventListener('DOMContentLoaded', function () {
    const TrangChu = document.querySelector('.user__navbar-home');
    const GioHang = document.querySelector('.user__navbar-home-shopify');
    const LichSuMuaHang = document.querySelector('.user__navbar-home-history');
    const TaiKhoanCuaBan = document.querySelector('.user__navbar-home-user');
    const TraCuuBaoHanh = document.querySelector('.user__navbar-home-rectangle');
    const HoTro = document.querySelector('.user__navbar-home-phone');
    const GopYPhanHoi = document.querySelector('.user__navbar-home-square');

    const user__TrangChu = document.querySelector('.user__TrangChu');
    const user__GioHang = document.querySelector('.user__GioHang');
    const user__LichSuMuaHang = document.querySelector('.user__LichSuMuaHang');
    const user__TaiKhoanCuaBan = document.querySelector('.user__TaiKhoanCuaBan');
    const user__TraCuuBaoHanh = document.querySelector('.user__TraCuuBaoHanh');
    const user__HoTro = document.querySelector('.user__HoTro');
    const user__GopYPhanHoi = document.querySelector('.user__GopYPhanHoi');

    // Lấy tất cả các biểu tượng icon
    const editIcons = document.querySelectorAll('.form-group-user-icon');

    // Gắn sự kiện click cho từng biểu tượng
    if (editIcons) {
        editIcons.forEach((icon) => {
            if (icon) {
                icon.addEventListener('click', () => {
                    // Tìm phần tử cha chứa cả icon và input
                    const formGroup = icon.closest('.form-group-user');
                    // Trong phần tử cha, tìm phần tử input
                    const inputField = formGroup.querySelector('input');
                    // Toggle thuộc tính disabled
                    inputField.disabled = false;
                    // inputField.disabled = !inputField.disabled;
                    // Nếu input được kích hoạt, đặt focus vào đó
                    if (!inputField.disabled) {
                        inputField.focus();
                    }
                });
            }
        });
    }

    var temp = TrangChu;
    var temp1 = user__TrangChu;
    if (TrangChu) {
        TrangChu.addEventListener('click', () => {
            TrangChu.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__TrangChu;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = TrangChu;
        })
    }

    if (GioHang) {
        GioHang.addEventListener('click', () => {
            GioHang.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__GioHang;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = GioHang;
        })
    }
    if (LichSuMuaHang) {
        LichSuMuaHang.addEventListener('click', () => {
            LichSuMuaHang.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__LichSuMuaHang;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = LichSuMuaHang;
        })
    }
    if (TaiKhoanCuaBan) {
        TaiKhoanCuaBan.addEventListener('click', () => {
            TaiKhoanCuaBan.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__TaiKhoanCuaBan;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = TaiKhoanCuaBan;
        })
    }
    if (TraCuuBaoHanh) {
        TraCuuBaoHanh.addEventListener('click', () => {
            TraCuuBaoHanh.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__TraCuuBaoHanh;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = TraCuuBaoHanh;
        })
    }
    if (HoTro) {
        HoTro.addEventListener('click', () => {
            HoTro.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__HoTro;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = HoTro;
        })
    }
    if (GopYPhanHoi) {
        GopYPhanHoi.addEventListener('click', () => {
            GopYPhanHoi.classList.add('user__active');
            temp1.style.display = 'none';
            temp1 = user__GopYPhanHoi;
            temp1.style.display = 'block';
            temp.classList.remove('user__active');
            temp = GopYPhanHoi;
        })
    }
});

