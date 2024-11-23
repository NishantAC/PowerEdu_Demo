export const getTime = (value) => {
    const timestamp = value;
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        // If the date is today, return only the time
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeString = date.toLocaleTimeString('en-US', options);
        return timeString;
    } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return `Yesterday`;
    } else {
        // Otherwise, return the date in "ddMMM" format
        const options = { day: 'numeric', month: 'short' };
        const dateString = date.toLocaleDateString('en-US', options);
        return dateString;
    }
};


export function getCurrentTime(data) {
    const date = data ? new Date(data) : new Date();
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


export  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];