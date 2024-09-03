// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import {acceptProduk, getMovieList, getProduk, rejectProduct, searchMovie} from "../../../Api/Api.jsx";
import { utils, writeFile } from "xlsx";
import * as emailjs from "emailjs-com";

function TableComponent() {

    const baseImageUrl = "https://rusconsign.com/api/storage/public"; // Replace with import.meta.env.VITE_APP_BASEIMG if necessary

    const [popularMovies, setPopularMovies] = useState([]);
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        fetchProdukList();
    }, []);

    const fetchProdukList = async () => {
        try {
            const result = await getProduk();
            if (result && result.barangs) {
                const sortedProduk = result.barangs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setProduk(sortedProduk);
            } else {
                console.error("Invalid Produk data structure");
            }
        } catch (e) {
            console.error("Error Fetching Produk data", e);
        }
    };

    const search = async (q) => {
        if (q.length > 3) {
            const query = await searchMovie(q);
            setPopularMovies(query.results);
            console.log({ query: query });
        }
    };

    const handleAcceptBarang = async (id, mitraEmail, namaToko) => {
        try {
            const isConfirmed = window.confirm("Apakah anda yakin ingin publish barang?");

            if (isConfirmed) {
                await acceptProduk(id);
                alert("Barang Telah Di publish");
                const templateParams = {
                    email: mitraEmail,
                    to_name: namaToko,
                    subject: "Produk Anda Telah Dipublikasikan",
                    message: "Dengan hormat, Kami dengan senang hati menginformasikan bahwa produk Anda telah berhasil dipublikasikan. Selamat berjualan, dan semoga sukses!"
                };
                emailjs.send('service_g69hsgc', 'template_6frjyib', templateParams, 'UjnvkaPDD5T1Df32X')
                    .then((response) => {
                        alert('SUCCESS!', response.status, response.text);
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        alert('FAILED...', error);
                        console.log('FAILED...', error);
                    });
                fetchProdukList();
            } else {
                console.log("publish barang dibatalkan");
            }
        } catch (e) {
            console.error("Error handling publish barang: ", e);
        }
    };

    const handleRejcetBarang = async (id, mitraEmail, namaToko) => {
        try {
            const isConfirmed = window.confirm("Apakah anda yakin ingin menolak barang?");

            if (isConfirmed) {
                await rejectProduct(id);
                alert("Barang Telah Di Reject");
                const templateParams = {
                    email: mitraEmail,
                    to_name: namaToko,
                    subject: "Penolakan Produk oleh Admin",
                    message: "Dengan hormat, Kami ingin memberitahukan bahwa produk yang Anda ajukan belum dapat disetujui oleh admin. Mohon maaf atas ketidaknyamanannya. Silakan coba untuk membuat produk baru yang sesuai dengan ketentuan. Terima kasih atas pengertiannya."
                };
                emailjs.send('service_g69hsgc', 'template_6frjyib', templateParams, 'UjnvkaPDD5T1Df32X')
                    .then((response) => {
                        alert('SUCCESS!', response.status, response.text);
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        alert('FAILED...', error);
                        console.log('FAILED...', error);
                    });
                fetchProdukList();
            } else {
                console.log("Rejcet barang dibatalkan");
            }
        } catch (e) {
            console.error("Error handling reject barang: ", e);
        }
    };

    const handleOnExport = () => {
        const wb = utils.book_new();
        const ws = utils.json_to_sheet(produk);

        // Set the width of each column
        const wscols = [
            {wpx: 50},  // Adjust these as needed
            {wpx: 200},
            {wpx: 100},
            {wpx: 150},
            // Add more columns as needed
        ];

        ws['!cols'] = wscols;

        // Apply header styles with color
        const headerRange = utils.decode_range(ws['!ref']);
        for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
            const cellAddress = utils.encode_cell({r: 0, c: C});
            if (ws[cellAddress]) {
                ws[cellAddress].s = {
                    fill: {
                        fgColor: { rgb: "FFFF00" }  // Yellow background color
                    },
                    font: {
                        bold: true,
                        color: { rgb: "FF0000" }  // Red font color
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    border: {
                        top: {style: "thin"},
                        bottom: {style: "thin"},
                        left: {style: "thin"},
                        right: {style: "thin"},
                    },
                };
            }
        }

        // Apply alignment, borders, and padding styles for the data rows
        for (let R = 1; R < produk.length + 1; R++) {
            for (let C = 0; C < wscols.length; C++) {
                const cellAddress = utils.encode_cell({r: R, c: C});
                if (!ws[cellAddress]) continue;

                ws[cellAddress].s = {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    border: {
                        top: {style: "thin"},
                        bottom: {style: "thin"},
                        left: {style: "thin"},
                        right: {style: "thin"},
                    },
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5,
                    },
                };
            }
        }

        utils.book_append_sheet(wb, ws, "SheetUser");

        writeFile(wb, "Data Produk.xlsx");
    };

    const modifyImageUrl = (url) => {
        const relativePath = url.replace('/storage/product_images/', '');
        return `${baseImageUrl}/product_images/${relativePath}`;
    };

    return (
        <>
            <div className={""}>
                <h1 className={"font-semibold font-sans text-3xl mb-2"}>
                    Data Produk
                </h1>
                <button onClick={handleOnExport}>
                    <div
                        className="px-5 py-5 flex flex-row mb-2 items-center gap-2.5 border border-gray-300 rounded-[10px] shadow-custom-dark h-[50px] w-[150px]">
                        <p className={"font-semibold"}>Download</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                </button>
            </div>
            <div className="table-auto overflow-auto h-[480px]">
                <table
                    className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                    <thead>
                    <tr>
                        <th className="table-header">No</th>
                        <th className="table-header">Nama Produk</th>
                        <th className="table-header">Deskripsi</th>
                        <th className="table-header">Harga</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Image</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Nama Toko</th>
                        <th className="table-header">Accept</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produk.map((produk, index) => {
                        const imageUrl = modifyImageUrl(produk.image_barang);
                        return (
                            <tr key={produk.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                                <td className="table-down">{produk.nama_barang}</td>
                                <td className="table-down">{produk.deskripsi}</td>
                                <td className="table-down">{produk.harga}</td>
                                <td className="table-down">{produk.status}</td>
                                <td className="table-down">
                                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={imageUrl} alt={produk.nama} className="w-20 h-20 object-cover"/>
                                    </a>
                                </td>
                                <td className="table-down">{produk.mitra.email}</td>
                                <td className="table-down">{produk.mitra.nama_toko}</td>
                                <td className="table-down text-[#FD0404]">
                                    {produk.status == 'pending' ? (
                                        <>
                                            <button onClick={() => handleAcceptBarang(produk.id, produk.mitra.email, produk.mitra.nama_toko)}>
                                                <FontAwesomeIcon icon={faCheckCircle}/>
                                            </button>
                                            <button className={"ml-4"} onClick={() => handleRejcetBarang(produk.id, produk.mitra.email, produk.mitra.nama_toko)}>
                                                <FontAwesomeIcon icon={faCircleXmark}/>
                                            </button>
                                        </>
                                    ) : null}

                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TableComponent;
