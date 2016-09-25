/**
 * Created by KG on 9/13/16.
 */
import React from "react";
import { Card} from 'react-toolbox/lib/card';
import theme from './HomeMiddleComponent.scss';
import MasteryImage from './MasteryImage';
import { Row, Col } from "react-flexbox-grid/lib/index";


class Home extends React.Component {

  render() {
    return (
      <Row style={{marginBottom:12}}>
        <Col xs={12} sm={12} lg={4}>
        <Card theme={theme} style={{marginRight:20}}>
          <h2>Discord Servers</h2>
          <iframe style={{alignSelf: 'center', paddingBottom: 20, border: 'none'}} src="https://discordapp.com/widget?id=218534373169954816&theme=dark" width="300" height="400" allowtransparency="true" frameborder="0"></iframe>
        </Card>
       </Col>
        <Col xs={12} sm={12} lg={4}>
        <Card className={theme.cardHotfix} theme={theme} style={{marginRight: 20}}>
          <h2> Twitch Streams</h2>
          <iframe src="http://streambadge.com/twitch/custom/2b2b2b/b9a3e3/808080/wwoody123/" style={{border:'none',height:'3em',width:'99%',margin: '1px 5px 5px 5px'}}></iframe>
          <iframe src="http://streambadge.com/twitch/custom/2b2b2b/b9a3e3/808080/darthjarjarcr/" style={{border:'none',height:'3em',width:'99%',margin: 5}}></iframe>
          <iframe src="http://streambadge.com/twitch/custom/2b2b2b/b9a3e3/808080/oden11/" style={{border:'none',height:'3em',width:'99%',margin: 5}}></iframe>
        </Card>
          </Col>
        <Col xs={12} sm={12} lg={4}>
        <Card theme={theme}>
          <h2>Coaching</h2>
          <a className={theme.mastery} href="http://mastery.gg/coach/Woody" style={{borderRadius:12, margin: '0 5px', textDecoration:'none'}}>
          <MasteryImage />
          <h4 style={{fontFamily: 'Roboto', color: 'black', margin: 0, paddingBottom: 15}}>Woody</h4>
          </a>
          <a className={theme.mastery} href="http://mastery.gg/coach/darthjarjar" style={{borderRadius:12, margin: '5px', textDecoration:'none'}}>
          <MasteryImage />
          <h4 style={{fontFamily: 'Roboto', color: 'black', margin: 0, paddingBottom: 15}}>darthjarjar</h4>
          </a>
        </Card>
          </Col>
      </Row>
    )
  }
}

export default Home;
