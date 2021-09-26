showError = (error) => {
  console.log("error", error);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    default:
      alert("An unknown error occurred");
  }
};

getPosition = (position) => {
  console.log("position", position);
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const location = {
    lat,
    lng,
  };

  this.setState({ location });
};

getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      this.getPosition,
      this.showError
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
