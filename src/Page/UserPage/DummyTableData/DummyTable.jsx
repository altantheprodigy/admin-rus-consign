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
                name: `User ${i}`,
                email: `Email ${i}`,
                password: `Password ${i}`,
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
                    <th className="table-header">Username</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Password</th>
                    <th className="table-header">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
                        <td className="table-down">{item.name}</td>
                        <td className="table-down">{item.email}</td>
                        <td className="table-down">{item.password}</td>
                        <td className="table-down text-[#FD0404]">{item.action}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
