// import { DetailForm } from "./form/DetailForm"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useParams } from 'react-router-dom';
import { Button, Container, ListGroup } from "react-bootstrap";
// import { FormWrapper } from "../utilities/FormWrapper";
// TODO edit btton somewhere to lead to that step in editform..
import { StoreItem } from "./StoreItem";




export function StoreItemView() {
    const { item_id } = useParams();
    const { getStoreItemById } = useShoppingCart();
    const item = getStoreItemById(item_id || '');

    // TODO show notes that are attached

    // * disabled version of DetailForm... could have been better by sharing the components but oh well

    // console.log(item);
    return (
        <div>
            <h1>Item: {item.name}</h1>
            <hr />
            <Container className="form-view-container">
                <div style={{
                    position: 'absolute',
                    bottom: '.5rem',
                    right: '.5rem'
                }}>
                    <Button className="carto-btn">Edit</Button>
                </div>
                <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>View Details</h2>
                <div style={{
                    display: "grid",
                    gap: "1rem .5rem",
                    justifyContent: "center",
                    gridTemplateColumns: "auto minmax(auto, 400px)",
                }}>
                    <label>Price: </label>
                    <input type="text" className="form-control" value={item.price} disabled maxLength={20} />
                    <label>Official Title: </label>
                    <input type="text" className="form-control"
                        value={item.name}
                        maxLength={20} disabled
                    />
                    <label>Associated Notes</label>
                    <ListGroup className="listGroup-associatedNotes">
                        <ListGroup.Item>note 1</ListGroup.Item>
                        <ListGroup.Item>fmds,mf,.ds</ListGroup.Item>
                        <ListGroup.Item>note 2</ListGroup.Item>
                        <ListGroup.Item>note dmsadka</ListGroup.Item>
                        <ListGroup.Item>ghfjdhdsk</ListGroup.Item>

                    </ListGroup>
                    <h6>Preview:</h6>
                    <div style={{ maxWidth: '250px' }}>
                        <StoreItem
                            name={item.name}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            id={item.id}
                            isPreview={true}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}