import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/firebase";
import axios from "axios";

function DogWalking() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);
  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cryptic-woodland-28293.herokuapp.com/api/invoices");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display the fetched data */}
      {data && (
        <ul>
          {data.map((item) => (
            <li>{item.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DogWalking;



  //   API.getAllInvoices()
  //     .then((data) => {
  //       console.log(data.invoices);
  //       setInvoices(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const columns = [
  //   { 
  //     field: "id", 
  //     headerName: "ID", 
  //     // flex: 0.5 
  //   },
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     flex: 0.3,
  //   },
  //   {
  //     field: "client",
  //     headerName: "Name",
  //     flex: 0.3,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 0.3,
  //   },
  //   {
  //     field: "address",
  //     headerName: "Address",
  //     flex: 0.6,
  //   },
  //   {
  //     field: "workDescription",
  //     headerName: "Job Category",
  //     flex: 0.3,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 0.2,
  //   },
  //   {
  //     field: "expenses",
  //     headerName: "Expenses",
  //     flex: 0.2,
  //   },
  //   {
  //     field: "isPaid",
  //     headerName: "Paid",
  //     flex: 0.2,
  //   } 
  // ];
  

