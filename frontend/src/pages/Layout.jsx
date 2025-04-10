import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = ({totalItems}) => {
    return ( 
        <>
            <div className="flex flex-col h-screen">
                <Header totalItems={totalItems} />
                <main className="flex flex-col">
                    <Outlet />
                </main>
            </div>
        </>
     );
}
 
export default Layout;