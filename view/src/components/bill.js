import { Button, Checkbox, FormControlLabel, FormGroup, Paper, TextareaAutosize } from '@material-ui/core';
import React, { Component } from 'react';
import agreement from '../data/rental-agreement.json';
import '../styles/components/bill.scss';

export default class Bill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            agreed: false
        }
    }

    render() {
        const { agreed } = this.state;
        const { onSubmit } = this.props;

        return (
            <Paper className="bill-container">
                <FormGroup>
                    <p className="bill-label">Please read through the following terms, and then submit your request:</p>
                    <TextareaAutosize rows={10} rowsMax={30} readOnly={true} value={agreement.text} className="agreement" />
                </FormGroup>
                <FormControlLabel
                    name="agreed"
                    control={<Checkbox checked={agreed} />}
                    label="I agree to the terms"
                    className="agreed"
                    onChange={evt => {
                        this.setState({ agreed: evt.target.checked })
                    }}
                />
                <div className="bill-actions">
                    <Button disabled={!agreed} variant="contained" color="primary" onClick={onSubmit}>Confirm</Button>
                </div>
            </Paper>
        )
    }
}
