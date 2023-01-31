const styles = {
  display: "flex",
  flexDirection: "column",
  border: "2px solid white",
  alignItems: "start",
  padding: "2rem 1rem",
  borderRadius: ".6rem",
  marginBottom: "2rem",
  width: "20rem",
};

const Card = ({ card }) => {
  console.log(("card", card));
  return (
    <div style={styles} key={card.id}>
      <p>ID: {card.id}</p>
      <p>Company: {card.company}</p>
      <p>Description: {card.description}</p>
      <p>Submission: {card.submissionType}</p>
      <p>Status: {card.status}</p>
    </div>
  );
};

export default Card;
