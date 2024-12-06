document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginName = document.getElementById('loginName').value;
    const loginPass = document.getElementById('loginPass').value;

    // Kiểm tra loginName và loginPass trong cơ sở dữ liệu
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginName, loginPass })
    });

    const data = await response.json();

    if (data.success) {
        // Lưu thông tin khách hàng vào sessionStorage
        sessionStorage.setItem('customerData', JSON.stringify(data.customerData));

        // Điều hướng đến trang userDashBoard
        window.location.href = 'userDashBoard.html';
    } else {
        document.getElementById('loginMessage').textContent = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
    }
});
