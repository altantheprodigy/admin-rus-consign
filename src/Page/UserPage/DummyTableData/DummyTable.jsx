// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {getUserList} from "../../../Api/ApiUser.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function TableComponent() {
    const [pengguna, setPengguna] = useState([]);

    useEffect(() => {
        fetchPengguna();
    }, []);

    const fetchPengguna = async () => {
        try {
            const result = await getUserList();
            console.log("Fetched user data:", result);
            if (Array.isArray(result)) {
                setPengguna(result);
            } else {
                console.error("Invalid user data structure", result);
            }
        } catch (error) {
            console.error("Error fetching data user", error);
        }
    };

    return (
        <div className="table-auto overflow-auto h-[535px]">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                <thead>
                <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Username</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {pengguna.map((item) => (
                    <tr key={item.user_id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{item.user_id}</td>
                        <td className="table-down">{item.name}</td>
                        <td className="table-down">{item.email}</td>
                        <td className="table-down text-[#FD0404]">
                            <FontAwesomeIcon icon={faTrash}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
