import React, { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import Nav from "./components/Nav"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Components
import Home from "./components/Home"
import Products from "./components/Products";
import ProductEdit from "./components/ProductEdit";
import ProductBuyHistory from "./components/ProductBuyHistory";
import LowStock from "./components/LowStock";
import BuyInvoices from "./components/BuyInvoices";
import BuyInvoicesView from "./components/BuyInvoicesView";
import AddBuyInvoice from "./components/AddBuyInvoice"
import AddBuyInvoice2 from "./components/AddBuyInvoice2";
import AddSellInvoice from "./components/AddSellInvoice";
import SellInvoices from "./components/SellInvoices";
import Settings from "./components/Settings";
// Custom Hooks
import useGetData from "./components/Custom Hooks/useGetData"
import useConnectionModal from "./components/Custom Hooks/useConnectionModal";
import { updateData } from "./Firebase-config";

export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Almarai',
      // fontSize: 32,
      fontWeightLight:700,
      fontWeightRegular: 700,
      fontWeightMedium:700,
      fontWeightBold:700,
    },
  });

  const [isLogin,setIsLogin] = useState(false)
  const [data] = useGetData("Products");
  const [settings] = useGetData("Settings")
  const [connectionModal,setConnectionModal] = useConnectionModal();

  data.sort((a, b) => a.name.localeCompare(b.name))

  const [search, setSearch] = useState("")
  function handleSearch(search){
    setSearch(search)
  }

  // data.map(e=>updateData("Products",e.id,{lowstock:500}))
  
  function handleLogin(value){
    setIsLogin(value)
  }

  useEffect(()=>{
    window.addEventListener('online',() => setConnectionModal(false))
    window.addEventListener('offline',() => setConnectionModal(true))
  },[])

  return (
    <ThemeProvider theme={theme}>
        <Router>
          {connectionModal}
          <Nav settings={settings} isLogin={isLogin} handleLogin={handleLogin} handleSearch={handleSearch}/>
          <Sidebar isLogin={isLogin}/>
          <article>
              <Routes>
                <Route path="/" element={<Home />}>  </Route>
                <Route path="/products" element={<Products data={data} search={search} settings={settings} isLogin={isLogin}/>}>  </Route>
                <Route path="/products/productbuyhistory" element={<ProductBuyHistory />}>  </Route>
                <Route path="/products/productedit" element={<ProductEdit data={data}/>}>  </Route>
                <Route path="/lowstock" element={<LowStock data={data} isLogin={isLogin}/>}>  </Route>
                <Route path="/buyinvoices" element={<BuyInvoices />}>  </Route>
                <Route path="/buyinvoices/buyinvoicesview" element={<BuyInvoicesView />}>  </Route>
                <Route path="/addbuyinvoice" element={<AddBuyInvoice data={data} settings={settings}/>}>  </Route>
                <Route path="/addbuyinvoice2" element={<AddBuyInvoice2 settings={settings}/>}>  </Route>
                <Route path="/sellinvoices" element={<SellInvoices />}>  </Route>
                <Route path="/addsellinvoice" element={<AddSellInvoice data={data} settings={settings}/>}>  </Route>
                <Route path="/settings" element={<Settings data={data} settings={settings}/>}>  </Route>
              </Routes>
          </article>
        </Router>
    </ThemeProvider>
  );
}