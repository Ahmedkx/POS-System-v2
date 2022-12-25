import React from 'react'
import { useLocation } from "react-router-dom";
import useGetDataLimit from './Custom Hooks/useGetDataLimit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ProductBuyHistory() {
    const location = useLocation();
    const [data,loading] = useGetDataLimit("BuyInvoices","invoiceData.date",10);
    let productId = location.state.itemId

    let arr = data.map(i=>{
        let item = i.items.filter(i=>i.productId == productId)[0]
        if(item != undefined){
            item.date = i.invoiceData.date
            item.distributorName = i.invoiceData.distributorName
        }
        return item;
    })
    arr = arr.filter(item => item !== undefined)
    console.log(data)

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 ,fontSize: "32px"}} aria-label="simple table">
            <TableHead>
                <TableRow sx={{fontSize: 32}} >
                    <TableCell align="center" sx={{fontSize: 32}} >الاسم</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>السعر</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الكمية</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الاجمالى</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>التاريخ</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الموزع</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!loading ? arr.map((e) => (
                    <TableRow  
                    key={e.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center" sx={{fontSize: 32}}>{e.name}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{e.buyPrice}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{e.quantity}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{e.total}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{e.date}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{e.distributorName}</TableCell>
                    </TableRow>)
                ) : <div className="spinner"></div>}
            </TableBody>
        </Table>
    </TableContainer>
    )
}