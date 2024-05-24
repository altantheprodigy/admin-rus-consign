// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import TextFieldComponent from "./TextFieldComponent.jsx";

function DropdownComponent() {


    return (
        <div className="flex flex-col">
            <h1 className="font-semibold font-sans text-3xl">Data User</h1>
            <div className={"flex flex-row"}>
                <TextFieldComponent/>
            </div>
        </div>
    );
}

export default DropdownComponent;