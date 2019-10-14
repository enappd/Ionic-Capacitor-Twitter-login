import { IonContent, IonText, IonRow, IonItem, IonThumbnail, IonLabel, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';
import { Twitter } from 'capacitor-twitter';
const twitter = new Twitter();
const INITIAL_STATE = {
  loggedIn: true,
  user: {}
};
const bearer_token = "AAAAAAAAAAAAAAAAAAAAAC%2FY9gAAAAAAnFcdd9x6393qSRl1XfrwReioweU%3DQ73reDyQn22fkob8VqdhDh0YpCpKnSY2AwmlUS8b8D7p9lDHOU";
class Home extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    const { history } = this.props;
    await twitter.logout();
    history.goBack();
  }

  async getUserInfo() {
    const bearer = 'Bearer ' + bearer_token;
    const url = `https://us-central1-auth-demos.cloudfunctions.net/getUserInfo`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userName: this.props.location.state.userName })
    });
    const myJson = await response.json();
    console.log(myJson);
    this.setState({
      user: myJson
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Logged in ... </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                You are logged in !
              </IonText>
            </IonCol>
          </IonRow>

          {this.state.user.name && <>
            <IonItem>
              <IonThumbnail slot="start">
                <img src={this.state.user.profile_image_url_https} />
              </IonThumbnail>
              <IonLabel>
                <h3>{this.state.user.name}</h3>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>{this.state.user.name}</h3>
                <p>@{this.state.user.screen_name}</p>
                <p>{this.state.user.location}</p>
              </IonLabel>
            </IonItem>
          </>
          }

          <IonButton className="login-button" onClick={() => this.signOut()} expand="full" fill="solid" color="danger">
            Logout from Twitter
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Home;
