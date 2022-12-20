import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemDivider, IonButton,  IonIcon} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { IonItem, IonLabel, IonAvatar, IonImg , IonActionSheet} from '@ionic/react';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';

interface ResetProps
    extends RouteComponentProps<{
        id: string;
    }> { }

interface Avion{
    id: number,
    numero: string,
    marque: string,
    model: string,
    assurance: string,
    dateentretien: string,
    km: number
}

const Detail: React.FC<ResetProps> = ({ match }) => {
    const { deletePhoto, photos, takePhoto, replacePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
    const history = useHistory();
    const [avions, setAvions] = useState<Avion[]>([]);
    const [detailAvion, setDetailAvion] = useState<Avion[]>([]);

    const token = localStorage.getItem('token');
    const myHeaders = {
        "Authorization": token
    };
    const idVehicule = match.params.id;
    // console.log(idVehicule);

    const i = idVehicule;


    useEffect(() => {
        const api = axios.create({
            baseURL: `https://springrestavion-production.up.railway.app/rest`
        })
        api.get("/avions/"+i, { headers: myHeaders })
            .then(res => {
                console.log(res.data);
                const detailVehicule = {
                    id: res.data.id,
                    numero: res.data.numero,
                    marque: res.data.marque,
                    model: res.data.model,
                    assurance: res.data.assurance,
                    dateentretien: res.data.dateEntretien,
                    km: res.data.km
                }
                const detail = [detailVehicule];
                setDetailAvion(detail);
                // setVehicules(res.data);
            })
            .catch(error => {
                console.log("Error fetching data");
                console.log(error);
            })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Details vehicule</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                        {
                                detailAvion
                                &&
                                detailAvion.map((avion) => {
                                    return (
                            <h4 key={avion.id}>{avion.id}</h4>
                            );
                        })}
                            <IonItemDivider></IonItemDivider>
                        </IonCol>
                    </IonRow>
                    <IonRow>
            {photos.map((photo, index) => (
                              <IonCol size="6" key={index}>
                              <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                            </IonCol>
            ))}
          </IonRow>
          <IonItemDivider></IonItemDivider>

        <IonButton onClick={() => takePhoto()}>add<IonIcon icon={camera}></IonIcon></IonButton>
            <IonButton onClick={() => replacePhoto()}>replace<IonIcon icon={camera}></IonIcon></IonButton>
            <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />

                    <IonRow>
                        <IonCol>
                            {
                                detailAvion
                                &&
                                detailAvion.map((avion) => {
                                    return (
                                        <IonItem
                                            key={avion.id}>
                                            <IonLabel>
                                                <h2><label>Numero: </label>{avion.numero}</h2>
                                                <h3><label>Marque: </label>{avion.marque}</h3>
                                                <h3><label>Model: </label>{avion.model}</h3>
                                                <h3><label>Assurance: </label>{avion.assurance}</h3>
                                                <h3><label>Date Entretien: </label>{avion.dateentretien}</h3>
                                                <p><label>Kilometrage: </label>{avion.km}</p>
                                            </IonLabel>
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

export default Detail;
