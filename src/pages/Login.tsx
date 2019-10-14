import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Twitter } from 'capacitor-twitter';
const twitter = new Twitter();
const INITIAL_STATE = {
  loggedIn: false,
};

class Login extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async getCurrentState() {
    twitter
      .isLogged()
      .then(r => console.log(r)) // returns { in: boolean, out: boolean }
      .catch(err => console.log(err));
  }

  async signIn(): Promise<void> {
    const { history } = this.props;
    twitter
      .login()
      .then(result => {
        console.log('result', result);
        history.push({
          pathname: '/home',
          state: { token: result.authToken, userId: result.userID, userName: result.userName }
        });
      }) // { authToken:string, authTokenSecret:string, userName:string, userID:string }
      .catch(err => console.log(err));
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic React App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol className="text-center">
              <IonImg className="title-img" src="assets/capacitor.png" ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                Twitter Login in Capacitor app
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-center">
                By Enappd Team
              </IonText>
            </IonCol>
          </IonRow>

          <IonButton className="login-button" onClick={() => this.signIn()} expand="full" fill="solid" color="primary">
            Login with Twitter
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Login;
