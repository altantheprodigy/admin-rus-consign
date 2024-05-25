// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage ,faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { acceptUser, getMitraList } from '../../../Api/ApiMitra.jsx';

function TableComponent() {

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




    return (
        <div className="table-auto overflow-auto h-[535px]">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
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
                </tr>
                </thead>
                <tbody>
                {user.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                        <td className="table-down">{item.nama}</td>
                        <td className="table-down">{item.nis}</td>
                        <td className="table-down">{item.nomor}</td>
                        <td className="table-down">{item.jumlahproduct}</td>
                        <td className="table-down">{item.jumlahjasa}</td>
                        <td className="table-down">{item.status}</td>
                        <td className="table-down"><FontAwesomeIcon icon={faImage}/></td>
                        <td className="table-down text-[#FD0404]">
                            <button onClick={() => handleAcceptUser(item.id)}>
                                <FontAwesomeIcon icon={faCheckCircle}/>
                            </button>
                            <button className={"ml-4"}>
                                <FontAwesomeIcon icon={faCircleXmark}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
