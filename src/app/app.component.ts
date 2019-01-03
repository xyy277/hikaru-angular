import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  images = ['/image/a', '/image/b', '/image/c', '/image/d', '/image/e', '/image/f'];
  urls = [];
  id: any;
  constructor() { }
  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.id = setInterval(() => {
      this.urls = [];
      const imageUrl = location.protocol + '//' + location.hostname + ':8888';
      this.images.forEach(url => {
        url = imageUrl + url + '/' + new Date().getTime();
        this.urls.push(url);
      });
    }, 1000);
  }

  stop() {
    if (isNullOrUndefined(this.id)) {
      this.getImage();
    } else {
      clearInterval(this.id);
      this.id = null;
    }
  }
}
