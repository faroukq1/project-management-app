"use client";

import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import TaskCard from "../component/TaskCard";
import ProjectCard from "../component/ProjectCard";
import UserCard from "../component/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.task && searchResults.task.length > 0 && (
              <>
                <h2>Tasks</h2>
                {searchResults.task.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </>
            )}

            {searchResults.project && searchResults.project.length > 0 && (
              <>
                <h2>Projects</h2>
                {searchResults.project.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </>
            )}

            {searchResults.users && searchResults.users.length > 0 && (
              <>
                <h2>Users</h2>
                {searchResults.users.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
