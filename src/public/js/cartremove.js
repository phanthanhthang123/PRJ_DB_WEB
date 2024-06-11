document.addEventListener('DOMContentLoaded', function () {
    const removeCartButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productIdInt = parseInt(productId, 10);
            if (!isNaN(productIdInt)) {
                fetch('/cart/remove', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: productIdInt })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Sản phẩm đã được xóa khỏi giỏ hàng');
                        location.reload(); // Reload the page to update the cart display
                    } else {
                        alert('Lỗi khi xóa sản phẩm khỏi giỏ hàng');
                    }
                })
                .catch(error => console.error('Error:', error));
            } else {
                alert('ID sản phẩm không hợp lệ');
            }
        });
    });
});