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
        if (invoice === null) {
            console.log("Invoice is null");
        } else {
            return invoice;
        }
    }
    return null;
}

function setNumberInvoice(invoice) {
    if (LocalStorageStatus()) {
        if (invoice !== null) {
            localStorage.removeItem("NumberInvoice");
            localStorage.setItem("NumberInvoice", invoice);
            return true;
        }
    }
    return false;
}

function getNumberInvoice() {
    if (LocalStorageStatus()) {
        var invoice = null;
        invoice = localStorage.getItem("NumberInvoice");
        if (invoice === null) {
            console.log("NumberInvoice is null");
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
        if (details === null) {
            console.log("InvoiceDetails is null");
        } else {
            return details;
        }
    }
    return null;
}

