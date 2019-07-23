import { Component, AfterContentInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";

import 'leaflet';
import 'leaflet-routing-machine';
declare let L;
import { Map, LatLng } from 'leaflet';
import * as $ from 'jquery';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.page.html',
  styleUrls: ['./stations-map.page.scss'],
})

export class StationsMapPage implements AfterContentInit {
  map: Map;
  posA_lat: string;
  posA_lng: string;
  posB_lat: string;
  posB_lng: string;
  heure: string;
  public alertController: AlertController;
  constructor(private http: HttpClient, public navCtrl: NavController, private route: ActivatedRoute) { }

  ngAfterContentInit() {
    this.route.queryParams.subscribe((res : any) => {
      this.posA_lat = res.posA_lat;
      this.posA_lng = res.posA_lng;
      this.posB_lat = res.posB_lat;
      this.posB_lng = res.posB_lng;
      this.heure = res.heure;
      this.leafletMap(this.posA_lat, this.posA_lng, this.posB_lat, this.posB_lng, this.heure);

    });
  }

  leafletMap(posA_lat: string, posA_lng: string, posB_lat: string, posB_lng: string, heure: string) {
    
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.map = L.map('mapId').setView([48.84617146118711, 2.3793068155646324], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: "Assist'o'Velib"
    }).addTo(this.map);

    let postData = {
      "datetime": heure
    }

    console.log(heure);
    this.http.post('https://cors-anywhere.herokuapp.com/https://j2s2guf8zd.execute-api.us-west-2.amazonaws.com/ProjetAnnuel_PROD/predict', postData) // + '?datetime=' + this.heure
    .subscribe( (res: any) => {
      console.log(res)
      res.body.data.stations.forEach(stations => {
        L.marker([stations.gps.latitude, stations.gps.longitude], {
          icon: L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        })
        .bindPopup('<i lat="' + stations.gps.latitude + '" lng="' + stations.gps.longitude + '">' +stations.name + '<br/><b>' + stations.nbbike + '</b> vélos prévus.<br/>')
        .on('popupopen', function() {
          $('#myBtn').removeAttr('disabled')
        })
        .addTo(this.map);
      }) 
    });

    /*this.http.get('https://cors-anywhere.herokuapp.com/https://j2s2guf8zd.execute-api.us-west-2.amazonaws.com/ProjetAnnuel_PROD/predict') // + '?datetime=' + this.heure
    .subscribe( (res: any) => {
      res.body.data.stations.forEach(stations => {
        L.marker([stations.gps.latitude, stations.gps.longitude], {
          icon: L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        })
        .bindPopup('<i lat="' + stations.gps.latitude + '" lng="' + stations.gps.longitude + '">' +stations.name + '<br/><b>' + stations.nbbike + '</b> vélos prévus.<br/>')
        .on('popupopen', function() {
          $('#myBtn').removeAttr('disabled')
        })
        .addTo(this.map);
      }) 
    });*/
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  goAnOtherPage() {
    $('#myBtn').attr('disabled', 'true')
    $('#myBtn').attr('hidden', 'true')
    $('#myBtn2').removeAttr('disabled')
    $('#myBtn2').removeAttr('hidden')
    const choosenStation_lat = $('i').attr("lat")
    const choosenStation_lng = $('i').attr("lng")
    this.map.remove();
    this.map = L.map('mapId').setView([this.posA_lat, this.posA_lng], 14);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: "Assist'o'Velib"
    }).addTo(this.map);
    
    L.Routing.control({
      waypoints: [
          L.latLng(this.posA_lat, this.posA_lng),
          L.latLng(choosenStation_lat, choosenStation_lng),
          L.latLng(this.posB_lat, this.posB_lng)
      ],
      routeWhileDragging: true
    }).addTo(this.map);
  }

  rateTraject() {
    this.map.remove();
    this.navCtrl.navigateForward('details-trajet')
  }

  ngOnDestroy(map: Map) {
    map.remove();
  }
}
