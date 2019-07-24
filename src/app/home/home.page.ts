import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  trajet = {depart: null, arrivee: null, heure: null}
  constructor(private http: HttpClient, private navCtrl: NavController) {}

  changePage(posA_lat: LatLng, posA_lng: LatLng, posB_lat: LatLng, posB_lng: LatLng, heure: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          posA_lat: posA_lat,
          posA_lng: posA_lng,
          posB_lat: posB_lat,
          posB_lng: posB_lng,
          heure: JSON.stringify(heure)
      }
    };
    this.navCtrl.navigateForward(['stations-map'], navigationExtras);
  }

  validateForm() {
    if (this.trajet.depart != null && this.trajet.arrivee != null) {
      if (this.trajet.heure == null) {
        this.trajet.heure = "2019-07-23T10:38:30.365+02:00"
      }
      let addr_dep = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.trajet.depart + '&key=API_KEY_HERE')
      let addr_arr = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.trajet.arrivee + '&key=API_KEY_HERE')
  
      forkJoin([addr_dep, addr_arr]).subscribe( (res: any) => {
        if (res['0'].status == "OK" && res['1'].status == "OK") {
          var posA_lat = res['0'].results['0'].geometry.location.lat
          var posA_lng = res['0'].results['0'].geometry.location.lng
          var posB_lat = res['1'].results['0'].geometry.location.lat
          var posB_lng = res['1'].results['0'].geometry.location.lng
          this.changePage(posA_lat, posA_lng, posB_lat, posB_lng, this.trajet.heure)
        }
        else {
          alert("Adresse(s) incorrect(es)")
        }
      });  
    }
    else {
      alert('Formulaire invalide ! Required : Depart - Arrivée')
    }
  }
}
