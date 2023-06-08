import React, { useState, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EdittableRow";
import data from "./mock-data.json";

// import API from "../../data/API";


const Contacts = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    date: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    workDescription: "",
    cost: "",
    expenses: "",
    paid: "",
  });

  const [editFormData, setEditFormData] = useState({
    date: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    workDescription: "",
    cost: "",
    expenses: "",
    paid: "",
  });
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
   
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      date: addFormData.date,
      fullName: addFormData.fullName,
      phoneNumber: addFormData.phoneNumber,
      address: addFormData.address,
      workDescription: addFormData.workDescription,
      cost: addFormData.cost,
      expenses: addFormData.expenses,
      paid: addFormData.paid,
    }; 

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();


    const editedContact = {
      date: editFormData.date,
      fullName: editFormData.fullName,
      phoneNumber: editFormData.phoneNumber,
      address: editFormData.address,
      workDescription: editFormData.workDescription,
      cost: editFormData.cost,
      expenses: editFormData.expenses,
      paid: editFormData.paid,
    };  

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }; 


  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
      workDescription: contact.workDescription,
      cost: contact.cost,
      expenses: contact.expenses,
      paid: contact.paid,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <header>
        <h1>INVOICES </h1>
        </header>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Work Description</th>
              <th>Cost</th>
              <th>Expenses</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      
      <h2>Add an Invoice</h2>
      <form onSubmit={handleAddFormSubmit} id="new">
      <input
          type="date"
          name="date"
          required="required"
          placeholder="Date"
          onChange={handleAddFormChange}
          
        />
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="workDescription"
          required="required"
          placeholder="Enter work description..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="cost"
          required="required"
          placeholder="Enter cost..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="expenses"
          required="required"
          placeholder="Enter extra expenses..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="paid"
          required="required"
          placeholder="Paid Y/N"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
//      
  );
};
export default Contacts;

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
  

//  
