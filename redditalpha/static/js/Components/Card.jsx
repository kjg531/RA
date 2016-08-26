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
                <h3>{this.props.name} ({this.props.cost})</h3>
                <img src={this.props.image_url} width="200" alt={this.props.image_url}/>
            </div>

        );
    }
});

var CardList = React.createClass({
    render: function() {
      return (
        <ul>
          {this.props.list.map(function(card){
              return (
                <Card key={card.id} name={card.name} cost={card.cost} image_url={card.image_url} />
              );
            })
          }
        </ul>
      )
    }
  });

// var ourList = [
//     '/static/images/cards/archers.jpg',
//     '/static/images/cards/archers.jpg',
// ];

render(<CardList list={BACKEND_CARDS} />, document.getElementById('cardlist'));