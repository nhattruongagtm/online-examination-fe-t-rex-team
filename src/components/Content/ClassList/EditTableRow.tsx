import react from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

const EditTableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}: any) => {
  return (
    <tr>
      <td>
        <TextField
          name="firstName"
          label=""
          variant="filled"
          value={editFormData.firstName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <TextField
          name="lastName"
          label="Tên lớp"
          variant="filled"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
          // required
          // value={inputField.lastName}
          // onChange={handleAddFormChange}
        />
      </td>
      <td>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  )
}
export default EditTableRow
