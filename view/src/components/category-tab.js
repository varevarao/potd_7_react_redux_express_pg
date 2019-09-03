import React, { Component } from 'react'
import { GridList, GridListTile, List, ListItem } from '@material-ui/core';

export default class CategoryTab extends Component {
    renderChildrenGrid(items) {
        return (
            <GridList className="children-grid">
                {
                    items.map((item, index) => (
                        <GridListTile key={`grid-child-${index}`} className="grid-child">
                            {item}
                        </GridListTile>
                    ))
                }
            </GridList>
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
