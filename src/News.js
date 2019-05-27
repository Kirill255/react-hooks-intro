import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function News() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);
  const searchInputRef = useRef();

  useEffect(() => {
    fetchResults();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // отключить eslint обязательно в этом примере или он будет ругаться на пропущенную зависимость и придёться пиздец как извращаться
  // просто вообще дикий костыль, создавать ссылку потом её обновлять при клике или при отправке формы (скорее второе)
  // пример найти можно сдесь https://www.robinwieruch.de/react-hooks-fetch-data/

  const fetchResults = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
      if (isMounted.current) {
        setResults(response.data.hits);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    // setResults([]);
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <h1 className="text-grey-darkest font-thin">HN news with React Hooks</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          className="border p-1 rounded"
          value={query}
          ref={searchInputRef}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          className="bg-teal text-white p-1 rounded"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {isLoading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map((result) => (
            <li key={result.objectID}>
              <a href={result.url} className="text-indigo-dark hover:text-indigo-darkest">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
