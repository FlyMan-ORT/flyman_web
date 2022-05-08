

function Row(props){
return(
    <tr>
    <th scope="row">
        {props.auto.patente}
    </th>
    <td>
        {props.auto.marca}
    </td>
    <td>
        {props.auto.modelo}
    </td>
    <td>
        {props.auto.ubicacion}
    </td>                    
  </tr>
);
}

export default Row;