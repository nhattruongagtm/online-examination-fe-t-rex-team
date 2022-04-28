import React, { useState, Fragment, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
import data from '../../../mock-data.json'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from 'antd';
import ReadOnlyRow from './ReadOnlyRow';
import EditTableRow from './EditTableRow';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 10);
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

type Props = {}

const ClassList = (props: Props, handleAddStudent: () => any) => {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: '', lastName: '' },
  ]);

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   console.log("InputFields", inputFields);
  // };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), firstName: '', lastName: '' }])
  }

  const handleRemoveFields = (id: any) => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  const [contacts, setContacts] = useState([]);
  // const [class, setClass] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/getAllClass')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    // fetch('http://localhost:8080/getAllClass').then(response => response.json()).then(res => console.log(res))
  }, [])
  const [addFormData, setAddFormData] = useState({
    firstName: '', lastName: ''
  })
  const [editFormData, setEditFormData] = useState({
    firstName: '', lastName: ''
  })

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event: any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    // newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event: any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData }
    // newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  }
  const handleAddFormSubmit = (event: any) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName
    };
    const newContacts = [...contacts, newContact]
    // setContacts(newContacts);
  }
  const handleEditFormSubmit = (event: any) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
    };

    const newContacts = [...contacts];

    // const index = contacts.findIndex((contact) => contact.classID === editContactId);

    // newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };



  const handleEditClick = (event: { preventDefault: () => void; }, contact: { id: React.SetStateAction<null>; firstName: any; lastName: any; }) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId: any) => {
    const newContacts = [...contacts];

    // const index = contacts.findIndex((contact) => contact.classID === contactId);

    // newContacts.splice(index, 1);

    // setContacts(newContacts);
  };
  return (
    <Container>
      <div className="container">
        <h3>Thêm lớp</h3>
        <form className={classes.root} onSubmit={handleAddFormSubmit}>
          {inputFields.map(inputField => (
            <div key={inputField.id}>
              <TextField
                name="firstName"
                label=""
                variant="filled"
                // value={inputField.firstName}
                onChange={handleAddFormChange}
              // required
              />
              <TextField
                name="lastName"
                label="Tên lớp"
                variant="filled"
                // required
                // value={inputField.lastName}
                onChange={handleAddFormChange}
              />
              <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={handleAddFields}
              >
                <AddIcon />
              </IconButton>
            </div>

          ))}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SendIcon></SendIcon>}
          // onClick={handleSubmit}
          >Lưu</Button>
        </form>
      </div>
      <div className="panel">
        <div className="panel-heading">
          Danh sách lớp
        </div>
        <div className="panel-body">
          <form action="" onSubmit={handleEditFormSubmit}>
            <table className='table'>
              <thead>
                <tr>
                  <th>Tên lớp</th>
                  {/* <Th>Mã lớp</Th> */}
                  <th>Danh sách sinh viên</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id='result'>
                {/* {contacts.map((contact) => (
                  <li key={contact.classID}>{contact.className}</li>
                  <Fragment>
                    {editContactId === contact.classID ? (
                      <EditTableRow
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
                ))} */}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Container>
  );
}
export default ClassList
