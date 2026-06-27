export const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",    
  });
};

export const formatInputDate = (value) => {
  if (!value) return "-";

  return new Date(value).toISOString().slice(0, 10);
};

export const formatInputTime = (value) => {
  if (!value) return "-";

  return new Date(value).toISOString().slice(11, 16);
};
