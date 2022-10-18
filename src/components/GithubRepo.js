import { useState, useEffect } from "react";

export const GithubRepo = () => {
  //state variables
  const [repos, setRepos] = useState();
  const [selectedRepo, setSelectedRepo] = useState();
  const [username, setUsername] = useState("");

  //useEffect for onload repos population
  useEffect(() => {
    getRepos("am0031");
  }, []);

  //function to get repos
  const getRepos = async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    ).then((response) => response.json());
    setRepos(response);
  };

  //function to get the info from the form and do the search
  const onSubmit = async (event) => {
    event.preventDefault();
    setSelectedRepo();
    getRepos(username);
  };

  //function to handle input field change
  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  //function to handle click on a repo to see more details
  const onRepoClick = (event) => {
    const selection = repos.filter(
      (item) => item.id === parseInt(event.target.id)
    )[0];
    setSelectedRepo(selection);
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <h1>
        Public repos by user - **This page is managed with useState and
        useEffect**
      </h1>

      <div>
        <h2>Search form</h2>
        <form onSubmit={onSubmit}>
          <input
            style={{ width: "400px" }}
            id="search-input"
            value={username}
            placeholder="Enter github username"
            onChange={handleChange}
          ></input>
          <button id="submit-btn">Search</button>
        </form>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
        >
          <h2>Search results</h2>
          {repos && repos.length ? (
            repos.map((item) => {
              return (
                <button
                  style={{ height: "20", width: "80%" }}
                  key={item.id}
                  id={item.id}
                  onClick={onRepoClick}
                >
                  {item.name}
                </button>
              );
            })
          ) : (
            <div> No repos </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h2>Details for selected repo</h2>
          {selectedRepo && (
            <>
              <h3>{selectedRepo.name}</h3>
              <h3>Last updated: {selectedRepo.updated_at}</h3>
              <h3>URL: {selectedRepo.url}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
