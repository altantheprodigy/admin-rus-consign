// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getMovieList } from "../../../Api/Api.jsx";

function TableComponent() {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getMovieList();
                if (result && result.results) {
                    setPopularMovies(result.results);
                } else {
                    console.error("Invalid movie data structure:", result);
                }
            } catch (error) {
                console.error("Error fetching movie list:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="table-auto overflow-auto h-[535px]">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                <thead>
                <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Title</th>
                    <th className="table-header">Overview</th>
                    <th className="table-header">Release Date</th>
                    <th className="table-header">Rating</th>
                    <th className="table-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {popularMovies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{movie.id}</td>
                        <td className="table-down">{movie.title}</td>
                        <td className="table-down">{movie.overview}</td>
                        <td className="table-down">{movie.release_date}</td>
                        <td className="table-down">{movie.vote_average}</td>
                        <td className="table-down text-[#FD0404]"><FontAwesomeIcon icon={faTrash} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
