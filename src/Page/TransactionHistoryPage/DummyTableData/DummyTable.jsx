// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {getTransaksiList} from "../../../Api/ApiTransaksi.jsx";

function TableComponent() {
    const [transaksi, setTransaksi] = useState([]);

    useEffect(() => {
        fetchTransaksi();
    }, []);

    const fetchTransaksi = async () => {
        try {
            const result = await getTransaksiList();
            if (result && Array.isArray(result.cods)) {
                setTransaksi(result.cods);
                console.log(result.cods);
            } else {
                console.error("Invalid Transaksi data structure:", result);
            }
        } catch (e) {
            console.error("Eror Fetching data transaksi", e)
        }
    }
    return (
        <div className="table-auto overflow-auto h-[535px]">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                <thead>
                <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Nama Produk</th>
                    <th className="table-header">Mitra</th>
                    <th className="table-header">Harga</th>
                    <th className="table-header">Pemesan</th>
                    <th className="table-header">Metode Pembayaran</th>
                    <th className="table-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {transaksi.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                        <td className="table-down">{item.barang.nama_barang}</td>
                        <td className="table-down">{item.mitra_id}</td>
                        <td className="table-down">{item.grand_total}</td>
                        <td className="table-down">{item.user.name}</td>
                        <td className="table-down">{item.status_pembayaran}</td>
                        <td className="table-down text-[#FD0404]">{item.action}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
