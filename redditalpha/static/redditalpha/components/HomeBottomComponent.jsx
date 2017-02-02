/**
 * Created by KG on 9/21/16.
 */
import React from "react";
import Card from 'react-toolbox/lib/card';
import { Row, Col } from "react-flexbox-grid/lib/index";
import theme from './HomeBottomComponent.scss';
import TwitterTimeline from './TwitterTimeline';

export default class LogoButton extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} lg={6}>
        <Card theme={theme}>
          <h2>YouTube</h2>
          <div style={{padding:5, margin:5, borderRadius: 12}}>
            <div className="g-ytsubscribe ytt" data-channelid="UCjC5dP9z3XQY6OEPWh5RiLw" data-layout="full" data-count="default"></div><br/>
            <div className="g-ytsubscribe" data-channel="wwoody123" data-layout="full" data-count="default"></div><span>  </span>
            <div className="g-ytsubscribe" data-channelid="UCwrRYl8cfH9WPrsvFeoXzig" data-layout="full" data-count="default"></div><span>  </span>
            <div className="g-ytsubscribe" data-channelid="UCx6U0bPb5XpShjnAmI_LXHw" data-layout="full" data-count="default"></div>
          </div>
        </Card>
          </Col>
          <Col xs={12} lg={6}>
                    <Card className={theme.cardHotfix} theme={theme}>
          <h2>Twitter</h2>
          <div style={{width: 360, alignSelf: 'center'}}>
          <TwitterTimeline />
        </div>
        </Card>
            </Col>
      </Row>
    )
  }
}
