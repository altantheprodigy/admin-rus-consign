import SideBarComponent from "../../Component/SideBar/SideBarComponent.jsx";
import DropdownComponent from "./FilterProduk/DropdownComponent.jsx";
import TableComponent from "./DummyTableData/DummyTable.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

function ProdukPage() {
    return (
        <div className={"m-4 flex flex-row"}>
            <div>
                <SideBarComponent/>
            </div>
            <div className={"ml-10 flex flex-col gap-5"}>
                <DropdownComponent/>
                <TableComponent/>
            </div>
        </div>
    )
}

export default ProdukPage