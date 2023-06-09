const URL_PREFIX = "https://cryptic-woodland-28293.herokuapp.com/api";

const API = {
    getAllInvoices:()=>{
        return fetch(`${URL_PREFIX}/invoices`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch invoices");
            }
        })
    },
    updateInvoice:(id, data) => {
        return fetch(`${URL_PREFIX}/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to update invoice");
            }
        });
    },
    getAllJobs:() => {
        
    }
};

export default API;