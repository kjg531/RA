/**
 * Created by KG on 9/21/16.
 */
import React from "react"
import theme from './ClanList.scss'
import GrommetMap from 'grommet/components/Map';

export default class LogoButton extends React.Component {
  render() {
    return (
            <GrommetMap data={{
              "categories": [
                {
                  "id": "category-1",
                  "label": "First category",
                  "items": [
                    {"id": "item-1-1", "node": "First item"},
                    {"id": "item-1-2", "node": "Second item"},
                    {"id": "item-1-3", "node": "Third item"}
                  ]
                },
                {
                  "id": "category-2",
                  "label": "Second category",
                  "items": [
                    {"id": "item-2-1", "node": "Fourth item"},
                    {"id": "item-2-2", "node": "Fifth item"}
                  ]
                },
                {
                  "id": "category-3",
                  "label": "Third category",
                  "items": [
                    {"id": "item-3-1", "node": "Sixth item"},
                    {"id": "item-3-2", "node": "Seventh item"}
                  ]
                }
              ],
              "links": [
                {"parentId": "item-1-1", "childId": "item-2-2"},
                {"parentId": "item-1-2", "childId": "item-2-2"},
                {"parentId": "item-1-2", "childId": "item-2-1"},
                {"parentId": "item-2-2", "childId": "item-3-1"},
                {"parentId": "item-2-1", "childId": "item-3-2"}
              ]
            }} />
    )
  }
}
