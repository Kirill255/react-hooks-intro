import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function News() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [url, setUrl] = useState(`https://hn.algolia.com/api/v1/search?query=${query}`);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);
  const searchInputRef = useRef();

  useEffect(() => {
    const fetchResults = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const response = await axios(url);

        if (isMounted.current) {
          setResults(response.data.hits);
        }
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);

      return () => {
        isMounted.current = false;
      };
    };

    fetchResults();
  }, [url]);

  const handleClearSearch = () => {
    setQuery("");
    // setResults([]);
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <h1 className="text-grey-darkest font-thin">HN news with React Hooks</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
        }}
        className="mb-2"
      >
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
