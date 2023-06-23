const Search = ({ text, setText }) => {
    return (
        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Search for a tag or a username"
            className="search_input peer max-w-[576px] mt-16"
            spellCheck="false"
        />
    );
};

export default Search;
