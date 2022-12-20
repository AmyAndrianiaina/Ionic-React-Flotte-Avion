import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {

  const history = useHistory();

  const start = () => {
    // console.log(vehicule);
    history.push("/login/");
};


  return (
<IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p> */}
              <IonButton onClick={start}>Login</IonButton>
              {/* <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a href="#">Sign up!</a>
              </p> */}

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
