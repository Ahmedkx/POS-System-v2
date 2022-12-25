// import JsBarcode from "jsbarcode";

export default function usePrintBarcode() {
    function setPrintBarcode(barcode,text){
        var a = window.open('', '', 'height=500, width=500');
        a.document.write(`<html><style> @media print{@page{size:30mm 21mm;margin:0;padding:0;background-color:red}body,html{font-family: 'Almarai', sans-serif;position:relative;width:100%;height:100%;max-width:100%;max-height:97%;margin:0;padding:0}svg{width:100%;height:100%;max-width:100%;max-height:100%}} </style>`);
        a.document.write('<head><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet"></head>')
        a.document.write('<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>')
        a.document.write('<body>');
        a.document.write("<svg id=barcode></svg>");
        a.document.write(`<script >JsBarcode("#barcode", "${barcode}", {text: "${text}",font: "Almarai",textMargin: -5,  fontOptions: "bold",  height: 25});window.print();window.close()</script>`);
        a.document.write('</body></html>');
    }

    return [setPrintBarcode]
}