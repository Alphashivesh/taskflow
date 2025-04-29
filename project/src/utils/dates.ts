export const formatDistanceToNow = (date: Date): string => {
  const now = new Date();
  const diff = Math.abs(date.getTime() - now.getTime());
  const isPast = date < now;
  
  // Convert milliseconds to days/hours/minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return isPast 
      ? `${days}d overdue` 
      : `Due in ${days}d`;
  }
  
  if (hours > 0) {
    return isPast 
      ? `${hours}h overdue` 
      : `Due in ${hours}h`;
  }
  
  if (minutes > 0) {
    return isPast 
      ? `${minutes}m overdue` 
      : `Due in ${minutes}m`;
  }
  
  return isPast ? 'Just overdue' : 'Due now';
};