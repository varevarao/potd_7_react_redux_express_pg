import { Grid, List, ListItem, Paper } from '@material-ui/core';
import React, { Component } from 'react';

export default class CategoryTab extends Component {
    renderChildrenGrid(items) {
        return (
            <Grid container className="children-grid" justify="center" alignItems="stretch">
                <Grid item container spacing={4} xs={10}>
                    {
                        items.map((item, index) => (
                            <Grid item xs={10} sm={6} md={4} key={`grid-child-${index}`} className="grid-child">
                                {item}
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        )
    }

    renderChildrenList(items) {
        return (
            <Grid container spacing={4} className="children-grid" justify="center" alignItems="stretch">
                <Grid item xs={10}>
                    {items && items.length &&
                        <Paper>
                            <List className="children-list">
                                {
                                    items.map((item, index) => (
                                        <ListItem key={`list-child-${index}`} className="list-child">
                                            {item}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    }
                </Grid>
            </Grid>
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
