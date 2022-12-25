import React from "react";
import "../styles/Sidebar.css"
import { Link , useLocation} from "react-router-dom";

export default function Sidebar({isLogin}){
    const location = useLocation().pathname;

    return(
        <aside>
            {location != "/addsellinvoice" && <Link to="/"><div className="img img-home" name="الرئيسية" ></div></Link>}
            <Link to="/products"><div className="img img-warehouse" name="المخزن" ></div></Link>
            <Link to="/lowstock"><div className="img img-wallet" name="النواقص" ></div></Link>
            {isLogin && <Link to="/buyinvoices"><div className="img img-invoice" name="فواتير الشركات" ></div></Link>}
            {isLogin && <Link to="/sellinvoices"><div className="img img-invoice" name="فواتير البيع" ></div></Link>}
            {isLogin && <Link to="/settings"><div className="img img-settings" name="الاعدادات" ></div></Link>}
        </aside>
    )
}