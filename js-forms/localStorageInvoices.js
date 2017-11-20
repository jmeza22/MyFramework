function setIdInvoice(invoice) {
    if (LocalStorageStatus()) {
        if (invoice !== null) {
            localStorage.removeItem("IdInvoice");
            localStorage.setItem("IdInvoice", invoice);
            return true;
        }
    }
    return false;
}

function getIdInvoice() {
    if (LocalStorageStatus()) {
        var invoice = null;
        invoice = localStorage.getItem("IdInvoice");
        if (invoice === null || invoice === undefined) {
            console.log("IdInvoice is null");
            setIdInvoice("[]");
        } else {
            return invoice;
        }
    }
    return null;
}

function setDetails(details) {
    if (LocalStorageStatus()) {
        if (details !== null) {
            localStorage.removeItem("InvoiceDetails");
            localStorage.setItem("InvoiceDetails", details);
            return true;
        }
    }
    return false;
}

function getDetails() {
    if (LocalStorageStatus()) {
        var details = null;
        details = localStorage.getItem("InvoiceDetails");
        if (details === null || details === undefined) {
            console.log("InvoiceDetails is null");
            setDetails("[]");
        } else {
            return details;
        }
    }
    return null;
}

