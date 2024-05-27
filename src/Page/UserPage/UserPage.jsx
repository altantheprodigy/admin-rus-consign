import SideBarComponent from "../../Component/SideBar/SideBarComponent.jsx";
import TableComponent from "./DummyTableData/DummyTable.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

function userPage() {
    return (
        <div className={"m-4 flex flex-row h-[600px]"}>
            <SideBarComponent/>
            <div className={"ml-10 flex flex-col"}>
                <TableComponent/>
            </div>
        </div>
    )

}
export default userPage;