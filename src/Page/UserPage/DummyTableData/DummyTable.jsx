// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {deleteUser, getUserList, searchUser} from "../../../Api/ApiUser.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { utils, writeFile } from "xlsx";

function TableComponent() {



    const [pengguna, setPengguna] = useState([]);

    useEffect(() => {
        fetchPengguna();
    }, []);

    const fetchPengguna = async () => {
        try {
            const result = await getUserList();
            console.log("Fetched user data:", result);
            const token = localStorage.getItem('authToken');
            console.log("token user adlah", token)
            if (Array.isArray(result)) {
                setPengguna(result);
            } else {
                console.error("Invalid user data structure", result);
            }
        } catch (error) {
            console.error("Error fetching data user", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const isConfirmed = window.confirm("Apakah anda yakin ingin menghapus user ini?");

            if (isConfirmed) {
                await deleteUser(id);
                alert("pengguna telah dihapus!");
                fetchPengguna()
            } else {
                console.log("Pennghapusan Pengguna Dibatalkan");
            }
        } catch (e) {
            console.error("Eror Handling Delete USer:", e)
        }
    }


    const handleOnExport = () => {
        // console.log(pengguna)

        var wb = utils.book_new(),
            ws = utils.json_to_sheet((pengguna));

        utils.book_append_sheet(wb, ws, "SheetUser");

        writeFile(wb, "Data User.xlsx");
    }

    const search = async (q) => {
       try {
           if (q.length >3){
               const query = await searchUser(q)
               setPengguna(query)
               console.log({query: query})
           } else {
               fetchPengguna();
           }
       } catch (e) {
           console.error("Eror Search Data", e)
       }
    }

    return (
        <>
            <div className={"mb-5"}>
                <h1 className={"font-semibold font-sans text-3xl"}>
                    Data User
                </h1>
            </div>
            <div className={"mb-5 flex flex-row"}>
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
                        <th className="table-header">Username</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Mitra_ID</th>
                        <th className="table-header">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pengguna.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                            <td className="table-down">{item.name}</td>
                            <td className="table-down">{item.email}</td>
                            <td className="table-down">{item.mitra_id}</td>
                            <td className="table-down text-[#FD0404]">
                                <button onClick={() => handleDeleteUser(item.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TableComponent;
