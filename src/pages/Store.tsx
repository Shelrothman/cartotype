import storeItems from '../data/items.json';
import { Col, Row } from 'react-bootstrap';


function Store() {
    return (
        <>
            <h1>
                Store
            </h1>
            <Row>
                {storeItems.map((item) => (
                    <Col>{JSON.stringify(item)}</Col>
                ))}
            </Row>
        </>
    );
}

export { Store };