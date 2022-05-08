import { Table } from 'reactstrap';
import Row from './Row';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        console.log('use effect');
        async function fetchData() {
            const response = await axios.get('http://192.168.68.106:3000/cars/');
            setCars(response.data);
        }
        fetchData();
    }, [])


    return (
        <div>
            <Table hover>
                <thead>
                    <tr>
                        <th>
                            Patente
                        </th>
                        <th>
                            Modelo
                        </th>
                        <th>
                            Nivel de combustible
                        </th>
                        <th>
                            Tipo de combustible
                        </th>
                        <th>
                            Parking
                        </th>
                        <th>
                            Ubicación
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map((car) => {
                            return <Row auto={car} key={car.id} />
                        })
                    }
                </tbody>
            </Table>
        </div>

    );
}


export default Home;