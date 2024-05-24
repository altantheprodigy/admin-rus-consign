// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TableComponent() {
    const generateData = () => {
        let generatedData = [];
        for (let i = 1; i <= 50; i++) {
            generatedData.push({
                id: i,
                name: `Produk ${i}`,
                mitra: `Mitra ${i}`,
                pembayaran: `Dana ${i}`,
                price: `$ ${i}`,
                category: "Produk",
                action: <FontAwesomeIcon icon={faTrash} />,
            });
        }
        return generatedData;
    };

    const data = generateData();


    return (
        <div className="table-auto overflow-auto h-[535px]">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                <thead>
                <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Nama Produk</th>
                    <th className="table-header">Mitra</th>
                    <th className="table-header">Harga</th>
                    <th className="table-header">Category</th>
                    <th className="table-header">Metode Pembayaran</th>
                    <th className="table-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                        <td className="table-down">{item.name}</td>
                        <td className="table-down">{item.mitra}</td>
                        <td className="table-down">{item.price}</td>
                        <td className="table-down">{item.category}</td>
                        <td className="table-down">{item.pembayaran}</td>
                        <td className="table-down text-[#FD0404]">{item.action}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
