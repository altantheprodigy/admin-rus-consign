// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {getMovieList, getProduk, searchMovie} from "../../../Api/Api.jsx";
import {utils, writeFile} from "xlsx";

function TableComponent() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [produk, setProduk] = useState([])

    useEffect(() => {
        fetchProdukList()
        // const fetchMovies = async () => {
        //     try {
        //         const result = await getMovieList();
        //         if (result && result.results) {
        //             setPopularMovies(result.results);
        //         } else {
        //             console.error("Invalid movie data structure:", result);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching movie list:", error);
        //     }
        // };
        //
        // fetchMovies();
    }, []);


    const fetchProdukList = async () => {
        try {
            const result = await getProduk();
            if (result && result.data) {
                setProduk(result.data)
            } else {
                console.error("Invalid Produk data structutre")
            }
        } catch (e) {
            console.error("Eror Fetching Produk data", e)
        }
    }

    const search = async (q) => {
        if (q.length >3){
            const query = await searchMovie(q)
            setPopularMovies(query.results)
            console.log({query: query})
        }
    }


    const handleOnExport = () => {
        // console.log(pengguna)

        var wb = utils.book_new(),
            ws = utils.json_to_sheet((produk));

        utils.book_append_sheet(wb, ws, "SheetUser");

        writeFile(wb, "Data Produk.xlsx");
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
                <button onClick={handleOnExport}>
                    <div
                        className="px-5 py-5 flex flex-row items-center gap-2.5 border border-gray-300 rounded-[10px] shadow-custom-dark h-[50px] w-[150px]">
                        <p className={"font-semibold"}>Download</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                        </svg>
                    </div>
                </button>
            </div>
            <div className="table-auto overflow-auto h-[535px]">
                <table
                    className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                    <thead>
                    <tr>
                        <th className="table-header">ID</th>
                        <th className="table-header">Nama Produk</th>
                        <th className="table-header">Deskripsi</th>
                        <th className="table-header">Harga</th>
                        <th className="table-header">Image</th>
                        <th className="table-header">ID Mitra</th>
                        <th className="table-header">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produk.map((produk) => (
                        <tr key={produk.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border border-gray-300 text-center">{produk.id}</td>
                            <td className="table-down">{produk.nama_product}</td>
                            <td className="table-down">{produk.deskripsi}</td>
                            <td className="table-down">{produk.harga}</td>
                            <td className="table-down"><img src={produk.image} className="w-20 h-20 object-cover"/></td>
                            <td className="table-down">{produk.id_mitra}</td>
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
