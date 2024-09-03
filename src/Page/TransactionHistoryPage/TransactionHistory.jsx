import SideBarComponent from "../../Component/SideBar/SideBarComponent.jsx";
import TableComponent from "./DummyTableData/DummyTable.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

function TransactionHistory() {
    return (
        <div className={"m-4 flex flex-row h-[400px]"}>
            <div>
                <SideBarComponent/>
            </div>
            <div className={"ml-10 flex flex-col gap-5 h-[580px]"}>
                <TableComponent/>
            </div>
        </div>
    )
}
export default TransactionHistory