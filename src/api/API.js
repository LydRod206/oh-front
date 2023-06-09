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
};

export default API;