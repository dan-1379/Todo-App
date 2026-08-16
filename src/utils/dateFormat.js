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