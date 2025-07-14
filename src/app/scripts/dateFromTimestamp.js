let dateFromTimestamp = (timestamp) => {
  if (timestamp) {
    let date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long", // 'long' gives the full month name
      day: "numeric",
    };

    // Format the date using toLocaleDateString()
    const formattedDate = date.toLocaleDateString("en-US", options);

   return formattedDate
  } else {
    console.warn("No timestamp provided for date formatting.");
    return "";
  }
};

export default dateFromTimestamp;
