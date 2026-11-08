export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
};
export const truncateText = (text, maxLength = 80) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
