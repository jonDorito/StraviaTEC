import { ServerService } from './../../server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AthleteService} from '../../athlete/athlete.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public token;
/***********************************************
 * this data object is only for test porpuses
 */
  public data = {
  "username":"Dxnium",
  "passwordhash":"hola1234",
  "name":"Daniel",
  "lastname_1":"Umana",
  "lastname_2":"Monge",
  "country":"SJ",
  "state":"SJ",
  "city":"SJ",
  "nationality":"Costa Rican",
  "birthday":10,
  "birthmonth":10,
  "birthyear":10
}
/********************************************** */


  constructor(private server : ServerService,private sanitizer: DomSanitizer,private athlete: AthleteService,private router: Router) {

   }


/**
 * Register Athlete
 * @param dataForm
 */
  registerAthlete(dataForm?){
    this.server.httpRegisterAthlete(dataForm)
  }

  /**
 * Register Athlete
 * @param dataForm
 */
registerOrganizer(dataForm?){
  this.server.httpRegisterOrganizer(dataForm)
  alert('Register succssefully')
}

   /**
   *
   * @param page
   */
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
/**
 *
 */
  login(params){
    this.server.httpLogin(params).subscribe(res =>{

      if(res['token'] != "NotRegistered" && res['token'] != "BadPassword"){
        
        if(res['id_athlete_fk'] != null){
          this.token = res['token'];
          this.athlete.setToken(this.token);
          this.server.setToken(this.token)
          this.goToPage('athlete');
          return;
        }
        this.token = res['token'];
        this.athlete.setToken(this.token);
        this.server.setToken(this.token)
        this.goToPage('organizer');
        return;
      }
      alert("wrong username or password")

    });
  // this.server.getImagebyToken().then(res => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(res);
  //   reader.onloadend = function() {
  //     // result includes identifier 'data:image/png;base64,' plus the base64 data
  //     let mySrc = reader.result;
  //     console.log(mySrc);
           
  //  }
  // }
  // )  
}
  
  


}
