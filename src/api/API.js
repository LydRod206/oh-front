const URL_PREFIX = "https://your-heroku-app.herokuapp.com";

const API = {
  getAllInvoices: () => {
    return fetch(`${URL_PREFIX}/api/invoices`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to fetch invoices");
      }
    });
  },
};

export default API;



// const URL_PREFIX = "https://cryptic-woodland-28293.herokuapp.com";

// const API = {
//     getAllInvoices:()=>{
//         return fetch(`${URL_PREFIX}/invoices`).then(res=>{
//             if (res.ok) {
//                 return res.json();
//             } else {
//                 throw new Error("failed to fetch invoices");
//             }
//         })
//     },
// };

// export default API;