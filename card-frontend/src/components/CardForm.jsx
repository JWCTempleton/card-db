const CardForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>New Card Submission</h2>

      <form onSubmit={onSubmit}>
        <input value={value} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CardForm;
