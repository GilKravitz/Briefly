import { t } from "@/core/i18n";
export const dateFormat = (dateStr: string) => {
  let date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const seconds = diff / 1000;
  if (seconds < 60) {
    return "Just now";
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)} ${t.article.date.min}`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)} ${t.article.date.h}`;
  }
  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)} ${t.article.date.days}`;
  }
  return date.toLocaleDateString();
};
