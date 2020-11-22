import { Component, OnInit } from '@angular/core';
import {Race} from '../../../../models/race.model';
import {AthleteService} from '../../../athlete.service';

@Component({
  selector: 'app-participating-races',
  templateUrl: './participating-races.component.html',
  styleUrls: ['./participating-races.component.css']
})

/**
 * This class is used a widget for displaying the races the user is currently participating on
 */
export class ParticipatingRacesComponent implements OnInit {
  currentRaces: Race[];

  constructor(private aService: AthleteService) {
    this.currentRaces = this.aService.participatingRaces;
  }

  ngOnInit(): void {
  }

}