// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import TextFieldComponent from "./TextFieldComponent.jsx";

function DropdownComponent() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="flex flex-col">
            <h1 className="font-semibold font-sans text-3xl">History Transaksi</h1>
            <div className={"flex flex-row"}>
                <select
                    className="mt-4 px-2 py-2 shadow-custom-dark rounded-[10px] h-[60px] w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Category</option>
                    <option value="produk1">Produk 1</option>
                    <option value="produk2">Produk 2</option>
                    <option value="produk3">Produk 3</option>
                </select>
                <TextFieldComponent/>
            </div>
        </div>
    );
}

export default DropdownComponent;