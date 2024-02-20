export const currencyFormat = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
};
