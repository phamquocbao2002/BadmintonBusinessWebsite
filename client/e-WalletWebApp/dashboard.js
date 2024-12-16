document.getElementById('accountInfoBtn').addEventListener('click', () => {
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));
    if (customerData) {
        document.getElementById('accountInfo').innerHTML = `
            <p>Khách hàng: ${customerData.displayName}</p>
            <p>Số tài khoản: ${customerData.accountNumber}</p>
            <p>Mã khách hàng: ${customerData.customerId}</p>
            <p>Số dư: ${customerData.balance} VND</p>
        `;
    } else {
        document.getElementById('accountInfo').textContent = 'Không có thông tin tài khoản!';
    }
});

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
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);

     
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

           
                const qrCodeResult = jsQR(imageData.data, canvas.width, canvas.height);
                if (qrCodeResult) {
                   
                    sessionStorage.setItem('qrData', qrCodeResult.data);
                    displayQrData(qrCodeResult.data);
                    const modal = document.getElementById('qrModal');
                    modal.style.display = 'none';
                } else {
                    alert("Không thể giải mã mã QR. Hãy thử ảnh khác.");
                }
            };
        };
        reader.readAsDataURL(file);
    }
});

function displayQrData(data) {
    const accountInfoDiv = document.getElementById('accountInfo');
    accountInfoDiv.innerHTML = '';

    try {
        const parsedData = JSON.parse(data); 
        const displayFields = {
            receiverName: 'Người nhận',
            amount: 'Tổng tiền cần thanh toán',
            qrCodeId: 'Nội dung'
        };
        for (const key in displayFields) {
            if (parsedData[key]) {
                const label = document.createElement('label');
                label.textContent = displayFields[key];
                accountInfoDiv.appendChild(label);

                const input = document.createElement('input');
                input.type = 'text';
                input.value = parsedData[key];
                input.readOnly = true;
                accountInfoDiv.appendChild(input);

                accountInfoDiv.appendChild(document.createElement('br'));
            }
        }
        const payButton = document.createElement('button');
        payButton.textContent = 'Thanh toán';
        accountInfoDiv.appendChild(payButton);
        payButton.addEventListener('click', async () => {
            handlePayment(parsedData);
        });
    } catch (error) {
        console.error("Dữ liệu không hợp lệ hoặc không phải JSON", error);
        alert("Không thể đọc dữ liệu QR.");
    }
}

async function handlePayment(qrData) {
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));
    if (!customerData || !customerData.accountNumber) {
        alert("Không tìm thấy thông tin tài khoản khách hàng.");
        return;
    }
    qrData.payerAccountNumber = customerData.accountNumber;
    delete qrData.receiverName;
    sessionStorage.setItem('qrData', JSON.stringify(qrData));

    try {
        const response = await fetch('http://localhost:3001/api/payService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(qrData)
        });

        const result = await response.json();
        showPaymentStatusModal(result.status);

    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi thực hiện thanh toán.');
    }
}

function showPaymentStatusModal(status) {
    const paymentStatusModal = document.getElementById('paymentStatusModal');
    const paymentStatusText = document.getElementById('paymentStatusText');
    paymentStatusText.textContent = `Trạng thái thanh toán: ${status}`;
    paymentStatusModal.style.display = 'block';
    document.querySelector('.close-payment-status').onclick = () => {
        paymentStatusModal.style.display = 'none';
    };
}


