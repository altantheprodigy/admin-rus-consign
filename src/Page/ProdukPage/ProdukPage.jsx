import SideBarComponent from "../../Component/SideBar/SideBarComponent.jsx";
import TableComponent from "./DummyTableData/DummyTable.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

function ProdukPage() {
    return (
        <div className={"m-4 flex flex-row h-[550px]"}>
            <SideBarComponent/>
            <div className={"ml-10 flex flex-col h-screen"}>
                <TableComponent/>
            </div>
        </div>
    )
}

export default ProdukPage