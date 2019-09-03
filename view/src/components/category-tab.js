import { Grid, List, ListItem } from '@material-ui/core';
import React, { Component } from 'react';

export default class CategoryTab extends Component {
    renderChildrenGrid(items) {
        return (
            <Grid container spacing={5} className="children-grid">
                {
                    items.map((item, index) => (
                        <Grid item xs={3} key={`grid-child-${index}`} className="grid-child">
                            {item}
                        </Grid>
                    ))
                }
            </Grid>
        )
    }

    renderChildrenList(items) {
        return (
            <List className="children-list">
                {
                    items.map((item, index) => (
                        <ListItem key={`list-child-${index}`} className="list-child">
                            {item}
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    renderChildren(items, type) {
        switch (type) {
            case 'grid':
                return this.renderChildrenGrid(items);
            case 'list':
                return this.renderChildrenList(items);
            default:
                // Default display type is list
                return this.renderChildrenList(items);
        }
    }

    render() {
        const { display, children } = this.props;

        return (
            <div className="category-tab">
                {
                    this.renderChildren(children, display)
                }
            </div>
        )
    }
}
