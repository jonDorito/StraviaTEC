import { ServerService } from './../../../server.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Race} from '../../../models/race.model';
import {OrganizerService} from '../../organizer.service';
import {NgForm} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-organizer-races',
  templateUrl: './organizer-races.component.html',
  styleUrls: ['./organizer-races.component.css']
})

/**
 * This class holds all the related information to the races of the organizer view. It holds a list of
 * the created races of the current organizer, a form for adding a new race and section for editing and
 * deleting the races
 */
export class OrganizerRacesComponent implements OnInit {
  @ViewChild('newRace') raceForm: NgForm;
  @ViewChild('updateRaceForm') updateForm: NgForm;
  public races;
  raceToUpdate: Race;
  isUpdateForm: boolean;
  urName: string;
  urType: string;
  urCost: string;
  urBankAccount: string;
  public nRace;

  constructor(private oService: OrganizerService, private server : ServerService, private router: Router) { this.isUpdateForm = false;}

  ngOnInit(): void {
    this.setRaces();


  }

  /**
   * This method is called when  a new race is created
   */
  addRace(): void {
    let race = {
      "name": this.raceForm.value.name,
      "date": this.raceForm.value.date,
      "cost": this.raceForm.value.race,
      "gpx": null,
      "country": this.raceForm.value.bankAccount
    };
    this.oService.postRace(race);
  }
  /***
   * set Races 
   */
  setRaces(){
    this.oService.getRaces().then(res => {
      console.log(res);

      this.races = res
      console.log(this.races);
    }
    );
  }
  /**
   * This method is called when a race from the race list is deleted
   * @param race to delete
   */
  onDeleteRace(race): void {
    this.server.deleteRace(race.id_race);
    this.setRaces();
    
  }

  /**
   * This method is called when the update button is called. This method sets the boolean var
   * for showing the update form and also sets a series of variables that fill the update form
   * @param race to update
   */
  onUpdateRace(race): void {
    this.raceToUpdate = race;
    this.isUpdateForm = true;
    this.urName =  this.raceToUpdate.name;
    this.urType =  this.raceToUpdate.type;
    this.urCost =  this.raceToUpdate.cost;
    this.urBankAccount =  this.raceToUpdate.bankAccount;
    this.nRace = race;
  }

  /**
   * This method is called when the update form is submitted
   */
  updateRace(race): void {
    this.isUpdateForm = false;

    let nRace = {
      "name": race.name,
      "date": race.date,
      "cost": parseInt(race.cost),
      "gpx": null,
      "country": race.country,
      "id_race": race.id_race,
      "id_organizer": race.id_organizer
  }
  this.server.updateRace(nRace);
  }
}
