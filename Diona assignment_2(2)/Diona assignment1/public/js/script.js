// Format currency values
document.addEventListener('DOMContentLoaded', function() {
    // Add any client-side formatting or interactions here
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    // Format all amount cells in tables
    document.querySelectorAll('.amount').forEach(cell => {
        const value = parseFloat(cell.textContent.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(value)) {
            cell.textContent = formatCurrency(value);
        }
    });
}); 