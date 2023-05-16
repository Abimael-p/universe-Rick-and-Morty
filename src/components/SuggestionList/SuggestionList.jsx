import "./SuggestionList.css";

const SuggestionList = ({
  suggestions,
  handleSuggestionClick,
  selectedSuggestion,
}) => {
  return (
    <ul className="style__suggestion">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className={selectedSuggestion === suggestion ? "selected" : ""}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
