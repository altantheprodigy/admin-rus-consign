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
        </div>
    );
}

export default DropdownComponent;