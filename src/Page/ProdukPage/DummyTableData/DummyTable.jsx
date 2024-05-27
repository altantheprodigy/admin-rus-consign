// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {getMovieList, searchMovie} from "../../../Api/Api.jsx";

function TableComponent() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
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
    const search = async (q) => {
        if (q.length >3){
            const query = await searchMovie(q)
            setPopularMovies(query.results)
            console.log({query: query})
        }
    }
    return (
        <>
            <div className={"mb-5"}>
                <h1 className={"font-semibold font-sans text-3xl"}>
                    Data Produk
                </h1>
                <input
                    type="text"
                    className="mr-5 w-[300px] p-3 border border-gray-300 rounded-[10px] shadow-custom-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cari Item Berdasarkan nama atau kode barang"
                    onChange={({target}) => search(target.value)}
                />
                <select
                    className="mt-4 px-2 py-2 shadow-custom-dark rounded-[10px] h-[60px] w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Category</option>
                    <option value="produk1">Produk 1</option>
                    <option value="produk2">Produk 2</option>
                    <option value="produk3">Produk 3</option>
                </select>
            </div>
            <div className="table-auto overflow-auto h-[535px]">
                <table
                    className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
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
                            <td className="table-down text-[#FD0404]"><FontAwesomeIcon icon={faTrash}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default TableComponent;
