const URL_PREFIX = process.env.REACT_APP_BACKEND_URL_PREFIX;

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
    getInvoiceById:(id)=>{
        return fetch(`${URL_PREFIX}/invoices/${id}`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch invoice");
            }
        })
    },
    createInvoice:(data)=>{
        return fetch(`${URL_PREFIX}/invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to create invoice");
            }
        });
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
    deleteInvoice:(id) => {
        return fetch(`${URL_PREFIX}/invoices/${id}`, {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                return res.json({message: "success"});
            } else {
                throw new Error("failed to delete invoice");
            }
        });
    },
    getAllClients:()=>{
        return fetch(`${URL_PREFIX}/clients`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch clients");
            }
        })
    },
    getClientById:(id)=>{
        return fetch(`${URL_PREFIX}/clients/${id}`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch client");
            }
        })
    },
    createClient:(data)=>{
        return fetch(`${URL_PREFIX}/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to create client");
            }
        });
    },
    updateClient:(id, data) => {
        return fetch(`${URL_PREFIX}/clients/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to update client");
            }
        });
    },
    deleteClient:(id) => {
        return fetch(`${URL_PREFIX}/clients/${id}`, {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                return res.json({message: "success"});
            } else {
                throw new Error("failed to delete client");
            }
        });
    },
    getAllJobs:()=>{
        return fetch(`${URL_PREFIX}/jobs`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch jobs");
            }
        })
    },
    getJobById:(id)=>{
        return fetch(`${URL_PREFIX}/jobs/${id}`).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to fetch job");
            }
        })
    },
    createJob:(data)=>{
        return fetch(`${URL_PREFIX}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to create job");
            }
        });
    },
    updateJob:(id, data) => {
        return fetch(`${URL_PREFIX}/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("failed to update job");
            }
        });
    },
    deleteJob:(id) => {
        return fetch(`${URL_PREFIX}/jobs/${id}`, {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                return res.json({message: "success"});
            } else {
                throw new Error("failed to delete job");
            }
        });
    }
};

export default API;