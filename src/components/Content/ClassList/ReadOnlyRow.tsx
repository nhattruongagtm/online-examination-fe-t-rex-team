import react from 'react';
import Button from '@material-ui/core/Button';
import { IRoute } from '../router';
import { useNavigate } from 'react-router'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }: any) => {
    const navigate = useNavigate()

    return (
        <tr>
            <td>{contact.firstName}</td>
            <td><a onClick={() => navigate(`${IRoute.STUDENT_LIST}?ma-mon-hoc=${123}`)}
            >DSSV</a></td>
            <Button
                type="button"
                onClick={(event) => handleEditClick(event, contact)}
            >
                Edit
            </Button>
            <Button type="button" onClick={() => handleDeleteClick(contact.id)}>
                Delete
            </Button>
        </tr>
    )
};
export default ReadOnlyRow;