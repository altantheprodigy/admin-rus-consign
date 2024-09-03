// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {getTransaksiList} from "../../../Api/ApiTransaksi.jsx";
import {utils, writeFile} from "xlsx";


function TableComponent() {
    const [transaksi, setTransaksi] = useState([]);
    const [filter, setFilter] = useState('selesai'); // Default filter
    const [loading, setLoading] = useState(false); // Loading state
    const [noData, setNoData] = useState(false); // No data state

    useEffect(() => {
        fetchTransaksi();
    }, [filter]); // Re-fetch when filter changes



    const handleOnExport = () => {
        const wb = utils.book_new();
        const ws = utils.json_to_sheet(transaksi);

        // Set the width of each column (adjust as needed)
        const wscols = [
            {wpx: 50},  // Column 1 width
            {wpx: 200}, // Column 2 width
            {wpx: 100}, // Column 3 width
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
        for (let R = 1; R < transaksi.length + 1; R++) {
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

        writeFile(wb, "Data Transaksi.xlsx");
    };


    const fetchTransaksi = async () => {
        setLoading(true);
        setNoData(false);
        try {
            const result = await getTransaksiList(filter);
            if (result && Array.isArray(result.cods)) {
                if (result.cods.length === 0) {
                    setNoData(true); // Set noData state if empty
                } else {
                    setTransaksi(result.cods);
                }
                console.log(result.cods);
            } else {
                console.error("Invalid Transaksi data structure:", result);
            }
        } catch (e) {
            console.error("Error Fetching data transaksi", e);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // Update the filter state
    };

    return (
        <div>
            <div className="flex mb-4">
                <button onClick={handleOnExport}>
                    <div
                        className="px-5 py-5 flex flex-row items-center gap-2.5 border border-gray-300 rounded-[10px] shadow-custom-dark h-[50px] w-[150px] mr-3.5">
                        <p className={"font-semibold"}>Download</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                        </svg>
                    </div>
                </button>
                <select
                    className="filter-dropdown p-2 border rounded"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="belum_pembayaran">Belum Pembayaran</option>
                    <option value="progres">Progres</option>
                    <option value="selesai">Selesai</option>
                    <option value="batal_pesanan">Dibatalkan</option>
                </select>
            </div>
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center">
                    <CircularProgress isIndeterminate color="red.600"/>
                </div>
            ) : noData ? (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-gray-500">Data API kosong</p>
                </div>
            ) : (
                <div className="table-auto overflow-auto h-[535px]">
                    <table
                        className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                        <thead>
                        <tr>
                            <th className="table-header">No</th>
                            <th className="table-header">Nama Produk</th>
                            <th className="table-header">Mitra</th>
                            <th className="table-header">Harga</th>
                            <th className="table-header">Pemesan</th>
                            <th className="table-header">Metode Pembayaran</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transaksi.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                                <td className="table-down">{item.barang.nama_barang}</td>
                                <td className="table-down">{item.mitra_id}</td>
                                <td className="table-down">{item.grand_total}</td>
                                <td className="table-down">{item.user.name}</td>
                                <td className="table-down">{item.status_pembayaran}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TableComponent;



