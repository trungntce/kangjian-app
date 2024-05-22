export const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };


 export const processString = (input) => {
    // Loại bỏ ký tự cuối cùng
    const stringWithoutLastChar = input.slice(0, -1);
    
    // Loại bỏ tất cả dấu chấm
    const stringWithoutDots = stringWithoutLastChar.replace(/\./g, '');

    
    return stringWithoutDots;
  };
  