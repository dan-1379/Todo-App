export const getCurrentDate = () => {
    const date = new Date();
    
    const options = { 
      timeZone: 'Europe/Dublin', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };

    const formattedDate = new Intl.DateTimeFormat('ire', options).format(date);
    return formattedDate;
}

export const formatDuration = (ms) => {
  if (!ms || ms < 0) return "—";

  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return "<1m";
}