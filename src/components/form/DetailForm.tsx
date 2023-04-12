import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { StoreItem } from "../StoreItem";
import { Col, Row } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import { consolidateStorePrice } from "../../utilities/formatCurrency";
// import { FormEvent } from "react";


type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: StorePrice;
    storeTitle: string;
}

type DetailFormProps = DetailFormData & {
    updateFields: (fields: Partial<DetailFormData>) => void
}

export function DetailForm({
    selectedItem,
    inputSearch,
    price,
    storeTitle,
    updateFields,
}: DetailFormProps) {

    const { currentTheme } = useTheme();

    const SPAN_CLASS = `input-group-text bg-${currentTheme === 'dark' ? 'secondary' : 'light'} text-${currentTheme === 'dark' ? 'light' : 'dark'}`;




    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className={SPAN_CLASS}>$</span>
                <input placeholder="0" type="number" id={`input-${currentTheme}`}
                    className="form-control" required value={price.dollars}
                    onChange={e => updateFields({ price: { ...price, dollars: +e.target.value } })}
                />
                <span className={SPAN_CLASS}>.</span>
                {/* //! not required; let them leave it at 0 if they want */}
                <input placeholder="00" type="number" id={`input-${currentTheme}`}
                    value={price.cents} className="form-control" style={{ maxWidth: '4rem' }}
                    onChange={(e) => updateFields({ price: { ...price, cents: +e.target.value } })}
                    max={99} min={0}
                />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control" id={`input-${currentTheme}`}
                placeholder={storeTitle} value={storeTitle} maxLength={20}
                onChange={e => updateFields({ storeTitle: e.target.value })}
            />
            <h6>Preview:</h6>
            <Row>
                <Col style={{ maxWidth: '250px'}}>
                    <StoreItem
                        name={storeTitle || inputSearch}
                        price={consolidateStorePrice(price)}
                        imgUrl={selectedItem?.imgUrl || ''}
                        id={selectedItem?.id || ''}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}