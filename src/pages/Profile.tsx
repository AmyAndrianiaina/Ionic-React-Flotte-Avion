import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemDivider, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';

interface ResetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const Dashboard: React.FC<ResetProps> = ({ match }) => {
  const history = useHistory();
  const [avions, setAvions] = useState<Array<any>>([]);

  const logout = () => {
    // console.log(vehicule);
    const token1 = localStorage.getItem('token');
    console.log('token before:' + token1)
    localStorage.setItem('token', '');
    const token2 = localStorage.getItem('token');
    console.log('token after:' + token2)
    history.push("/login/");
};

const getItemData = (vehicule : any) => {
  // console.log(vehicule);
  history.push("/detail/" + vehicule.id);
};

  const getAssurance1mois = () => {
    // console.log(vehicule);
    history.push("/assurance/1mois");
};

const getAssurance3mois = () => {
  // console.log(vehicule);
  history.push("/assurance/3mois");
};

  const token = localStorage.getItem('token');
  const myHeaders = {
    "Authorization": token
  };
  useEffect(() => {
    const api = axios.create({
      baseURL: `https://springrestavion-production.up.railway.app/rest`
    })
    api.get("/avions", { headers: myHeaders })
      .then(res => {
        console.log(res.data)
        setAvions(res.data)
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List Avions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <h4>Welcome: {match.params.id}</h4>
              <IonItemDivider></IonItemDivider>
            </IonCol>
            <IonButton onClick={logout}>Logout</IonButton>
              <IonItemDivider></IonItemDivider>
            <IonButton onClick={getAssurance1mois}>Assurance 1 Mois</IonButton>
            <IonItemDivider></IonItemDivider>
            <IonButton onClick={getAssurance3mois}>Assurance 3 Mois</IonButton>
            <IonItemDivider></IonItemDivider>
          </IonRow>
          <IonRow>
            <IonCol>
              {
                avions
                &&
                avions.map((avion, i) => {
                  return (
                    <IonItem
                            onClick={() => getItemData(avion)} 
                            key={avion.id}>
                            <IonLabel>
                              <h2>{avion.numero}</h2>
                              <ul></ul>
                            </IonLabel>
                            {/* <IonLabel>
                                <h2>{vehicule.numero}</h2>
                                <h3>{vehicule.marque}</h3>
                                <h3>{vehicule.model}</h3>
                                <h3>{vehicule.couleur}</h3>
                                <p>{vehicule.km}</p>
                            </IonLabel> */}
                        </IonItem>
                  );
                })}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
