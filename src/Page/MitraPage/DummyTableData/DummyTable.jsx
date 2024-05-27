// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage, faCheckCircle, faCircleXmark, faTrash} from '@fortawesome/free-solid-svg-icons';
import {acceptUser, deleteMitra, getMitraList} from '../../../Api/ApiMitra.jsx';
import {utils, writeFile} from "xlsx";

const baseImageUrl = import.meta.env.VITE_APP_BASEIMG;

function TableComponent() {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [user, setUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const result = await getMitraList();
            if (result && result.data) {
                setUsers(result.data);
            } else {
                console.error("Invalid Mitra data structure:", result);
            }
        } catch (error) {
            console.error("Error fetching Mitra data:", error);
        }
    };

    const handleAcceptUser = async (id) => {
        try {
            const isConfirmed = window.confirm("Apakah Anda yakin ingin menerima pengguna ini?");

            if (isConfirmed) {
                await acceptUser(id);
                alert("Pengguna telah diterima!");
                fetchUserList()
            } else {
                console.log("Penerimaan pengguna dibatalkan.");
            }
        } catch (error) {
            console.error("Error handling accepted user:", error);
        }
    }

    const handleDeleteMitra =  async (id) => {
        try {
            const isConfirmed = window.confirm("Apakah anda yakin ingin menghapus Mitra ini?");


            if (isConfirmed){
                await deleteMitra(id);
                alert("Mitra Telah Dihapus!")
                fetchUserList()
            } else {
                console.log("Penghapusan Mitra Dibatalkan!")
            }
        }catch (e) {
            console.error("Eror Handling Delete Mitra", e)
        }
    }

    const handleOnExport = () => {
        // console.log(pengguna)

        var wb = utils.book_new(),
            ws = utils.json_to_sheet((user));

        utils.book_append_sheet(wb, ws, "SheetUser");

        writeFile(wb, "Data Mitra.xlsx");
    }

    return (
        <>
            <div className={"mb-5"}>
                <h1 className={"font-semibold font-sans text-3xl"}>
                    Data Mitra
                </h1>
            </div>
            <div className={"mb-5 flex flex-row"}>
                <input
                    type="text"
                    className="mr-5 w-[300px] p-3 border border-gray-300 rounded-[10px] shadow-custom-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cari Item Berdasarkan nama atau kode barang"
                    value={inputValue}
                    onChange={handleInputChange}
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
                        <th className="table-header">Nama Lengkap</th>
                        <th className="table-header">NIS</th>
                        <th className="table-header">Dompet Digital</th>
                        {/*<th className="table-header">Nama Toko</th>*/}
                        <th className="table-header">Jumlah Product</th>
                        <th className="table-header">Jumlah Jasa</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Foto ID Card</th>
                        <th className="table-header">Action</th>
                        <th className="table-header">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map((item) => {
                        const imageUrl = `${baseImageUrl}${item.image}`;
                        console.log("Image URL:", imageUrl); // Debug log
                        return (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                                <td className="table-down">{item.nama}</td>
                                <td className="table-down">{item.nis}</td>
                                <td className="table-down">{item.nomor}</td>
                                <td className="table-down">{item.jumlahproduct}</td>
                                <td className="table-down">{item.jumlahjasa}</td>
                                <td className="table-down">{item.status}</td>
                                <td className="table-down">
                                    <img src={imageUrl} alt={item.nama} className="w-20 h-20 object-cover"/>
                                </td>
                                <td className="table-down text-[#FD0404]">
                                    <button onClick={() => handleAcceptUser(item.id)}>
                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                    </button>
                                    <button className={"ml-4"}>
                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                    </button>
                                </td>
                                <td className={"table-down text-[#FD0404]"}>
                                    <button onClick={() => handleDeleteMitra(item.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
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
