function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    const successMsg = document.querySelector(`#${modalId} .success-message`);
    if (successMsg) successMsg.classList.remove('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function setAmount(inputId, amount) {
    document.getElementById(inputId).value = amount;
}

function handleAddMoney(e) {
    e.preventDefault();
    const amount = document.getElementById('addAmount').value;
    if (amount && amount > 0) {
        document.getElementById('addMoneySuccess').classList.add('show');
        setTimeout(() => closeModal('addMoneyModal'), 1500);
    }
}

function handleWithdraw(e) {
    e.preventDefault();
    const amount = document.getElementById('withdrawAmount').value;
    if (amount && amount > 0) {
        document.getElementById('withdrawSuccess').classList.add('show');
        setTimeout(() => closeModal('withdrawModal'), 1500);
    }
}

function handleGift(e) {
    e.preventDefault();
    alert('Gift sent successfully!');
    closeModal('giftModal');
}

function handleSubscribeOther(e) {
    e.preventDefault();
    alert('Subscription purchased for user!');
    closeModal('subscribeOtherModal');
}

function selectGift(name, price) {
    alert(`Selected ${name} gift for $${price}`);
}

function selectWithdrawMethod(method, element) {
    document.querySelectorAll('.withdraw-method').forEach(m => m.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('mpesaDetails').style.display = 'none';
    document.getElementById('paypalDetails').style.display = 'none';
    document.getElementById('binanceDetails').style.display = 'none';
    
    if (method === 'mpesa') {
        document.getElementById('mpesaDetails').style.display = 'block';
    } else if (method === 'paypal') {
        document.getElementById('paypalDetails').style.display = 'block';
    } else if (method === 'binance') {
        document.getElementById('binanceDetails').style.display = 'block';
    }
}

// Copy SpurtNumber function
function copySpurtNumber() {
    const spurtNumber = 'SP-1234-5678';
    navigator.clipboard.writeText(spurtNumber).then(() => {
        const notification = document.getElementById('copyNotification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

// Tab switching function
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const tab = this.dataset.tab;
        const transactions = document.querySelectorAll('.transaction-item');
        
        transactions.forEach(transaction => {
            if (tab === 'all') {
                transaction.style.display = 'flex';
            } else {
                const type = transaction.dataset.type;
                if (type === tab || (tab === 'gifts' && (type === 'gift'))) {
                    transaction.style.display = 'flex';
                } else {
                    transaction.style.display = 'none';
                }
            }
        });
    });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Payment method selection
document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.payment-btn').forEach(b => {
            b.style.background = 'hsla(var(--muted), 0.3)';
            b.style.borderColor = 'hsla(var(--border), 0.5)';
        });
        this.style.background = 'rgba(190, 242, 100, 0.1)';
        this.style.borderColor = 'var(--lime-400)';
    });
});