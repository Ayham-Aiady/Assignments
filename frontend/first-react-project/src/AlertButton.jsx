function AlertButton({ message }) {
  return (
    <button 
      className="alertButton" 
      onClick={() => alert(message)}
    >
      Show Details
    </button>
  );
}

export default AlertButton;