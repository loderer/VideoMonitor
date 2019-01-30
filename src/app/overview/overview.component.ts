import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() {
    this.initStreams();
  }

  ngOnInit() {
  }

initStreams() {
    navigator.mediaDevices.enumerateDevices()
     .then((devices) => {
       devices.forEach((device) => {
         if(device.kind === 'videoinput') {
           var constraints = { deviceId: { exact: device.deviceId } };
           var container = document.getElementById("container");
           container.innerHTML += '<video id="video' + device.deviceId + '" autoplay style="flex-grow:1;"></video>';
           navigator.mediaDevices.getUserMedia({ video: constraints })
           .then((stream) => {
             var video = (<HTMLVideoElement> document.querySelector('#video' + device.deviceId));
             video.srcObject = stream;
           });
         }
       });
     })
     .catch((err) => {
       console.log(err.name + ": " + err.message);
     });
  }
}
