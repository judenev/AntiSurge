import React from 'react'
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js/dist/html2pdf.bundle"
import'./hhhh.css'
function PrintInvoice() {
  const pdfJSX = () => {
    return (
      <>
        <header>

          <h1> INVOICE </h1>
          <address>
            <p> Anti-Surge </p>
            <p> #429, First Floor </p>
            <p> Kochi </p>
            <p> +911231453212 </p>
          </address>



        </header>
        <body>
          <article>
            <address>
              <p> Anti-Surge Pvt Lmtd </p>
            </address>

            <table className="firstTable">
              <tr>
                <th><span >Invoice #</span></th>
                <td><span >101138</span></td>
              </tr>
              <tr>
                <th><span >Date</span></th>
                <td><span >January 1, 2012</span></td>
              </tr>
              <tr>
                <th><span >Payable Amount</span></th>
                <td><span id="prefix" >$</span><span>600.00</span></td>
              </tr>
            </table>

            <table className="secondTable">
              <thead>
                <tr>
                  <th><span >Service Type</span></th>
                  <th><span >Description</span></th>
                  <th><span >Rate</span></th>
                  <th><span >Model</span></th>
                  <th><span >Price</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a class="cut">-</a><span >Front End Consultation</span></td>
                  <td><span >Experience Review</span></td>
                  <td><span data-prefix>$</span><span >150.00</span></td>
                  <td><span >4</span></td>
                  <td><span data-prefix>$</span><span>600.00</span></td>
                </tr>
              </tbody>
            </table>
            <table className="firstTable">
              <tr>
                <th><span >Total</span></th>
                <td><span data-prefix>$</span><span>600.00</span></td>
              </tr>
              <tr>
                <th><span >Amount Paid</span></th>
                <td><span data-prefix>$</span><span >0.00</span></td>
              </tr>
              <tr>
                <th><span >Balance Due</span></th>
                <td><span data-prefix>$</span><span>600.00</span></td>
              </tr>
            </table>
          </article>

          <aside>
            <h1 id="notes">Additional Notes</h1>
            <div >
              <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
            </div>
          </aside>

        </body>
      </>
    )
  }

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(pdfJSX());
    // const printElement = pdfJSX();

    html2pdf().from(printElement).save();
  }

  return (
    <div className="App">
      <button onClick={printHandler}>Print</button>
    </div>
  );
}

export default PrintInvoice