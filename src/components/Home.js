import { Table } from 'reactstrap';
import Row from './Row';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [cars, setCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [carsWithReservationFirst, setCarsWithReservationFirst] = useState([]);

    useEffect(() => {
        console.log('use effect');
        async function fetchData() {
            // TODO: sacar URL hardcodeada.
            const carsResponse = await axios.get('http://192.168.0.140:3000/cars/');
            setCars(carsResponse.data);

            const reservantionResponse = await axios.get('http://192.168.0.140:3000/reservations/');
            setReservations(reservantionResponse.data)

            //separo los autos con reserva
            let filteredCars= cars.filter((c)=>{
                return reservations.some((r)=>{
                    return r.car.plate == c.plate;
                });
            });
            
            //separo el resto de los autos sacando los que tenian reserva
            let restOfcars = cars.filter((c)=>{
                return !filteredCars.includes(c)
            })    
                 
            //junto los dos array quedando los que tienen reserva al principio y agregando los otros detrás
            //TODO: ordenar previamente los reservados por fecha más próxima
            filteredCars.push(...restOfcars)
            
            setCarsWithReservationFirst(filteredCars);
    
            
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
                        carsWithReservationFirst.map((car) => {
                            return <Row auto={car} key={car.id} />
                        })
                    }
                </tbody>
            </Table>
        </div>

    );
}


export default Home;