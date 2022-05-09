

function Row(props) {
    return (
        <tr>
            <th scope="row">
                {props.auto.plate}
            </th>
            <td>
                {props.auto.description}
            </td>
            <td>
                {props.auto.fuelLevel}
            </td>
            <td>
                {props.auto.fuelType}
            </td>
            <td>
                {props.auto.parkingName}
            </td>
            <td>
                {props.auto.idParkingSlot}
            </td>
        </tr>
    );
}

export default Row;