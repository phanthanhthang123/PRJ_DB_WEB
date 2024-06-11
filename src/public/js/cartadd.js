document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productIdInt = parseInt(productId, 10); // Chuyển đổi productId thành số nguyên
            if (!isNaN(productIdInt)) {
                fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: productIdInt }) // Gửi productId dưới dạng số nguyên
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Sản phẩm đã được thêm vào giỏ hàng');
                        } else {
                            alert('Lỗi khi thêm sản phẩm vào giỏ hàng');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                alert('ID sản phẩm không hợp lệ');
            }
        });
    });
});