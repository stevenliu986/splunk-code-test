export const formatNumber = (num: string): string => {
  const cleaned = num.replace(/\D/g, "");
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
