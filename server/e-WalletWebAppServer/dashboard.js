window.onload = function () {
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));

    if (customerData) {
        document.getElementById('displayName').textContent = customerData.displayName;
    }

    document.getElementById('viewAccountInfoBtn').addEventListener('click', async () => {
        // Tìm thông tin tài khoản từ collection 'paymentAccount'
        const customerId = customerData.customerId;

        const response = await fetch(`/getAccountInfo/${customerId}`);
        const accountData = await response.json();

        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <h2>Thông tin tài khoản</h2>
            <p>Tên hiển thị: ${accountData.displayName}</p>
            <p>Số tài khoản: ${accountData.accountNumber}</p>
            <p>Mã khách hàng: ${accountData.customerId}</p>
            <p>Số dư: ${accountData.balance} VND</p>
        `;
    });
};

document.getElementById('qrCodeBtn').addEventListener('click', () => {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'block';

    document.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
});

document.getElementById('uploadQrBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const qrContent = decodeQRCode(e.target.result);
            displayQrData(qrContent);
        };
        reader.readAsDataURL(file);
    }
});
