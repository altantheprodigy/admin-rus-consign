import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircleXmark, faTrash} from '@fortawesome/free-solid-svg-icons';
import {acceptUser, deleteMitra, getMitraList, rejectMitra, searchMitra} from '../../../Api/ApiMitra.jsx';
import {utils, writeFile} from "xlsx";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import * as emailjs from "emailjs-com";

const baseImageUrl = import.meta.env.VITE_APP_BASEIMG;

function TableComponent() {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const result = await getMitraList();
            if (result && result.data) {
                const sortedUsers = result.data.sort((a, b) => b.id - a.id);
                setUsers(sortedUsers);
            } else {
                console.error("Invalid Mitra data structure:", result);
            }
        } catch (error) {
            console.error("Error fetching Mitra data:", error);
        }
    };

    const handleAcceptUser = async (id, mitraEmail, namaToko) => {
        try {
            const isConfirmed = window.confirm("Apakah Anda yakin ingin menerima pengguna ini?");
            if (isConfirmed) {
                await acceptUser(id);
                alert("Mitra Berhasil Diterima")
                // <Alert status='success'>
                //     <AlertIcon />
                //     Mitra Berhasil Diterima!
                // </Alert>
                const templateParams = {
                    email: mitraEmail,
                    to_name: namaToko,
                    subject: "Pendaftaran Mitra Telah Diterima!",
                    message: "Selamat! Anda telah diterima sebagai Mitra."
                };
                emailjs.send('service_g69hsgc', 'template_6frjyib', templateParams, 'UjnvkaPDD5T1Df32X')
                    .then((response) => {
                        alert('SUCCESS!', response.status, response.text);
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        alert('FAILED...', error);
                        console.log('FAILED...', error);
                    });
                fetchUserList();
            } else {
                console.log("Penerimaan pengguna dibatalkan.");
            }
        } catch (error) {
            // <Alert status='error'>
            //     <AlertIcon />
            //     <AlertTitle>Penerimaan Mitra Eror</AlertTitle>
            //     <AlertDescription>{error}</AlertDescription>
            // </Alert>

            alert("Eror Accept Mitra", error)
            fetchUserList();
        }
    };

    const handleRejectMitra = async (id, mitraEmail,namaToko) => {
        try {
            const isConfirmed = window.confirm("Apakah Anda yakin ingin menolak pengguna ini?");
            if (isConfirmed) {
                await rejectMitra(id);
                await deleteMitra(id);
                alert("Mitra Berhasil Ditolak")
                // <Alert status='success'>
                //     <AlertIcon />
                //     Mitra Berhasil Ditolak!
                // </Alert>
                const templateParams = {
                    email: mitraEmail,
                    to_name: namaToko,
                    subject: "Pendaftaran Mitra Telah Ditolak!",
                    message: "Maaf, Anda ditolak mendaftar menjadi mitra, coba lagi dengan ketentuan yang sesuai!"
                };
                emailjs.send('service_g69hsgc', 'template_6frjyib', templateParams, 'UjnvkaPDD5T1Df32X')
                    .then((response) => {
                        alert('SUCCESS!', response.status, response.text);
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        alert('FAILED...', error);
                        console.log('FAILED...', error);
                    });
                fetchUserList();
            } else {
                console.log("Penolakan pengguna dibatalkan.");
            }
        } catch (error) {
            alert("Penolakan Mitra Eror", error)
            // <Alert status='error'>
            //     <AlertIcon />
            //     <AlertTitle>Penolakan Mitra Eror</AlertTitle>
            //     <AlertDescription>{error}</AlertDescription>
            // </Alert>
        }
    };

    const handleDeleteMitra = async (id) => {
        try {
            const isConfirmed = window.confirm("Apakah anda yakin ingin menghapus Mitra ini?");
            if (isConfirmed) {
                await deleteMitra(id);
                alert("Mitra Telah Dihapus!");
                fetchUserList();
            } else {
                console.log("Penghapusan Mitra Dibatalkan!");
            }
        } catch (e) {
            console.error("Error Handling Delete Mitra", e);
        }
    };

    const handleOnExport = () => {
        const ws = utils.json_to_sheet(user);

        // Set the width of each column
        const wscols = [
            {wpx: 50},  // No
            {wpx: 200}, // Nama Toko
            {wpx: 100}, // NIS
            {wpx: 150}, // Dompet Digital
            {wpx: 150}, // Jumlah Product
            {wpx: 150}, // Jumlah Jasa
            {wpx: 250}, // Email
            {wpx: 100}, // Status
            {wpx: 200}, // Foto ID Card
            {wpx: 100}, // Action
            {wpx: 100}  // Delete
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

        // Apply some alignment and margin styles for the data rows
        for (let R = 1; R < user.length + 1; R++) {
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

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "SheetUser");
        writeFile(wb, "Data Mitra.xlsx");
    };

    const search = async (q) => {
        if (q.length > 3) {
            const query = await searchMitra(q);
            setUsers(query.data);
            console.log({query: query});
        } else {
            fetchUserList();
        }
    };

    return (
        <>
            <div className={"mb-5"}>
                <h1 className={"font-semibold font-sans text-3xl"}>Data Mitra</h1>
            </div>
            <div className={"mb-5 flex flex-row"}>
                <input
                    type="text"
                    className="mr-5 w-[300px] p-3 border border-gray-300 rounded-[10px] shadow-custom-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cari Item Berdasarkan nama atau kode barang"
                    onChange={({target}) => search(target.value)}
                />
                <button onClick={handleOnExport}>
                    <div className="px-5 py-5 flex flex-row items-center gap-2.5 border border-gray-300 rounded-[10px] shadow-custom-dark h-[50px] w-[150px]">
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
                <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-custom-light">
                    <thead>
                    <tr>
                        <th className="table-header">No</th>
                        <th className="table-header">Nama Toko</th>
                        <th className="table-header">NIS</th>
                        <th className="table-header">Dompet Digital</th>
                        <th className="table-header">Jumlah Product</th>
                        <th className="table-header">Jumlah Jasa</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Foto ID Card</th>
                        <th className="table-header">Action</th>
                        <th className="table-header">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map((item, index) => {
                        const imageUrl = `${baseImageUrl}${item.image}`;
                        return (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                                <td className="table-down">{item['nama toko']}</td>
                                <td className="table-down">{item.nis}</td>
                                <td className="table-down">{item.nomor}</td>
                                <td className="table-down">{item.jumlahproduct}</td>
                                <td className="table-down">{item.jumlahjasa}</td>
                                <td className="table-down">{item.email}</td>
                                <td className="table-down">{item.status}</td>
                                <td className="table-down">
                                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={imageUrl} alt={item.nama} className="w-20 h-20 object-cover"/>
                                    </a>
                                </td>
                                <td className="table-down text-[#FD0404]">
                                    {item.status === 'pending' ? (
                                        <>
                                            <button onClick={() => handleAcceptUser(item.id, item.email,item['nama toko'])}>
                                                <FontAwesomeIcon icon={faCheckCircle}/>
                                            </button>
                                            <button className={"ml-4"} onClick={() => handleRejectMitra(item.id, item.email,item['nama toko'])}>
                                                <FontAwesomeIcon icon={faCircleXmark}/>
                                            </button>
                                        </>
                                    ) : null}
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
