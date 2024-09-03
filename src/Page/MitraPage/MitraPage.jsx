// eslint-disable-next-line no-unused-vars
import React from "react";
import SideBarComponent from "../../Component/SideBar/SideBarComponent.jsx";
import TableComponent from "./DummyTableData/DummyTable.jsx";

function MitraPage() {
    return (
        <div className={"m-4 flex flex-row h-[570px]"}>
            <div>
                <SideBarComponent/>
            </div>
            <div className={"ml-10 flex flex-col"}>
                <TableComponent/>
            </div>
        </div>
    )
}

export default MitraPage