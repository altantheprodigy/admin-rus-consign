import React from "react";

function SideBarComponent() {
    return (
        <div className={"border-[#FF3D3D] border-4 rounded-lg w-[115px] h-[95vh] pt-20 space-y-12 px-10"}>
            <img src="/logo.png" alt="Logo" className="hover-card"/>
            <a href={"/"} className={"flex flex-col items-center"}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hover-card">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>
                    </svg>
                </div>
                <p className={"text-sideBar"}>Transaction</p>
            </a>
            <a href={"/user"} className={"flex flex-col items-center"}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hover-card">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>
                    <p className={"text-sideBar"}>User</p>

                </div>
            </a>
            <a href={"/produk"} className={"flex flex-col items-center"}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hover-card">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                    </svg>
                    <p className={"text-sideBar"}>Produk</p>
                </div>
            </a>
            <a href={"/mitra"} className={"flex flex-col items-center"}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hover-card">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                    </svg>
                    <p className={"text-sideBar"}>Mitra</p>
                </div>
            </a>
        </div>
    )
}

export default SideBarComponent