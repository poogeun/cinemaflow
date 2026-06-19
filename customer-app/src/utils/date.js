export const getDateKey = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const formatDate = (value) => {
  const date = new Date(value);

  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

export const formatShortDate = (value) => {
  const date = new Date(value);

  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};

export const formatTime = (value) => {
  const date = new Date(value);

  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (value) => {
  const date = new Date(value);

  return date.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getWeekLabel = (value) => {
  const todayKey = getDateKey(new Date());
  const dateKey = getDateKey(value);

  if (todayKey === dateKey) {
    return "오늘";
  }

  const date = new Date(value);

  return date.toLocaleDateString("ko-KR", {
    weekday: "short",
  });
};