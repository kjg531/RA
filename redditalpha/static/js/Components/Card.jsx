/**
 * Created by KG on 8/9/16.
 */
import React from "react"
import { render } from "react-dom"
const CardImage = '/static/images/cards/clashroyale-icons-archers.jpg'


var Card = React.createClass({
    // This component doesn't hold any state - it simply transforms
    // whatever was passed as attributes into HTML that represents a picture.
    // clickHandler: function(){
    //     // When the component is clicked, trigger the onClick handler that
    //     // was passed as an attribute when it was constructed:
    //     this.props.onClick(this.props.id);
    // },

    render: function(){
        //
        // var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');

        return (

            <div>
                <img src={this.props.src} width="200" />
            </div>

        );
    }
});

var CardList = React.createClass({
    render: function() {
      return (
        <ul>
          {this.props.list.map(function(listValue){
            return <div>
                <Card src={listValue}/>
                     </div>
             })}
        </ul>
      )
    }
  });

var ourList = [
    '/static/images/cards/clashroyale-icons-archers.jpg',
    '/static/images/cards/clashroyale-icons-archers.jpg',
];

render(<CardList list={ourList} />, document.getElementById('cardlist'));
