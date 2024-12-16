document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginName = document.getElementById('loginName').value;
    const loginPass = document.getElementById('loginPass').value;

    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginName, loginPass }),
        });

        const data = await response.json();

        if (data.status === 'failed') {
            document.getElementById('error-message').textContent = 'Login failed! Please check your credentials.';
        } else if (data.status === 'success') {
            sessionStorage.setItem('customerData', JSON.stringify({
                displayName: data.displayName,
                customerId: data.customerId,
                accountNumber: data.accountNumber,
                balance: data.balance,
            }));
            window.location.href = 'userDashBoard.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
