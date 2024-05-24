// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function TextFieldComponent() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="mt-4 px-2 py-2 flex gap-5">
            <input
                type="text"
                className="w-[300px] p-3 border border-gray-300 rounded-[10px] shadow-custom-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari Item Berdasarkan nama atau kode barang"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div
                className="px-5 py-5 flex flex-row items-center gap-2.5 border border-gray-300 rounded-[10px] shadow-custom-dark h-[50px] w-[150px]">
                <p className={"font-semibold"}>Download</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                </svg>
            </div>

            {/*<p className="mt-2 text-gray-600">You typed: {inputValue}</p>*/}
        </div>
    );
}

export default TextFieldComponent;
