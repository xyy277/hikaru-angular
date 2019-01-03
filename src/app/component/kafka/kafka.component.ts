import { Component, OnInit } from '@angular/core';
import {Kafka} from '../../module/kafka/model/kafka';

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})
export class KafkaComponent implements OnInit {

  kafkas: Kafka[];
  kafka: Kafka = null;
  constructor() { }

  ngOnInit() {
  }

}
