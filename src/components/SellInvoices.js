// import React, { useEffect, useState } from 'react'
// import useGetDataLimit from './Custom Hooks/useGetDataLimit';

// export default function SellInvoices() {
//     const [data,loading] = useGetDataLimit("SellInvoices","invoiceData.time",10);

//     return (
//             <div className="products">
//                 <div className="background"></div>
//                 <div className="header">
//                     <div>التاريخ</div>
//                     <div>الوقت</div>
//                     <div>اجمالى الفاتورة</div>
//                 </div>
//                 {!loading ? data.map((d)=>(
//                     <div key={d.id} className="item">
//                         <div>{d.invoiceData.date}</div>
//                         <div>{d.invoiceData.time}</div>
//                         <div>{d.invoiceData.totalPrice} جنيه</div>
//                     </div>)): <div className="spinner"></div>}
//             </div>
//     )
// }

import React from 'react'
import useGetDataLimit from './Custom Hooks/useGetDataLimit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SellInvoices() {
    const [data,loading] = useGetDataLimit("SellInvoices","invoiceData.date",15);
    console.log(data)

    return (
        
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" sx={{fontSize: 32}}>الاسم</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>السعر</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الكمية</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الاجمالى</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>التاريخ</TableCell>
                    <TableCell align="center" sx={{fontSize: 32}}>الوقت</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!loading ? data.map((invoice) => (
                    invoice.items.map((data)=>(<TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center" sx={{fontSize: 32}}>{data.name}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{data.price}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{data.quantity}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{data.price * data.quantity}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{invoice.invoiceData.date}</TableCell>
                        <TableCell align="center" sx={{fontSize: 32}}>{invoice.invoiceData.time}</TableCell>
                    </TableRow>))
                )) : <div className="spinner"></div>}
            </TableBody>
        </Table>
    </TableContainer>
    )
}