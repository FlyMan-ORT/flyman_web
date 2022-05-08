import {Table  } from 'reactstrap';
import Row from './Row'

function Home(){       
     
    let miArray = [
    {
        patente: "123",
        marca: "ford",
        modelo: "focus",
        ubicacion: "4F"
    },
    {
        patente: "456",
        marca: "ford",
        modelo: "frio",
        ubicacion: "5F"
    },
    {
        patente: "789",
        marca: "ford",
        modelo: "astra",
        ubicacion: "8C"
    },
    {
        patente: "321",
        marca: "ford",
        modelo: "faca",
        ubicacion: "1A"
    },
]

    return(
        <div>          
            <Table hover>
            <thead>
                <tr>
                <th>
                    Patente
                </th>
                <th>
                    Marca
                </th>
                <th>
                    Modelo
                </th>
                <th>
                    Ubicación
                </th>
                </tr>
            </thead>
                <tbody>
                    {
                        miArray.map((item)=> {
                            return <Row auto={item}/>
                        })
                    }                        
                </tbody>
            </Table>
        </div>
        
    );
}


export default Home;