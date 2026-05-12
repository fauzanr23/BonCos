import EditButton from "./EditButton";
import { formattedTime } from "../helpers/FormattedTime";

export default function TableCategories({ onClick, el, index }) {
  return (
    <>
      <tbody>
        {/* row 1 */}
        <tr>
          <th>{index + 1}</th>
          <td>{el.name}</td>
          <td>{formattedTime(el.createdAt)}</td>
          <td>{formattedTime(el.updatedAt)}</td>
          <td>
            <EditButton onClick={onClick} />
          </td>
        </tr>
      </tbody>
    </>
  );
}
