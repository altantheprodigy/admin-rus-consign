// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faImage  } from '@fortawesome/free-solid-svg-icons';
import {getUserList} from "../../../Api/ApiUser.jsx";

function TableComponent() {

    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUserList();
                if (result && result.data){
                    setUser(result.data)
                } else {
                    console.error("Invalid movie data structure:", result)
                }
            } catch (eror) {
                console.error("Eror fetching data user", eror)
            }
        };
        fetchUser()
    }, []);


    // const generateData = () => {
    //     let generatedData = [];
    //     for (let i = 1; i <= 50; i++) {
    //         generatedData.push({
    //             id: i,
    //             name: `User ${i}`,
    //             email: `NIS ${i}`,
    //             password: `Dompet Digital ${i}`,
    //             foto: <FontAwesomeIcon icon={faImage} />,
    //             action: <FontAwesomeIcon icon={faTrash} />,
    //         });
    //     }
    //     return generatedData;
    // };
    //
    // const data = generateData();


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
                        <td className="table-down text-[#FD0404]"><FontAwesomeIcon icon={faTrash}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
