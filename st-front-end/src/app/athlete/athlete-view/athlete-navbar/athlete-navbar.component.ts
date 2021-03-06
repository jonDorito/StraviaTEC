import { ServerService } from './../../../server.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AthleteService} from '../../athlete.service';
import {Athlete} from '../../../models/athlete.model';
import {Router} from '@angular/router';
import {Race} from '../../../models/race.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './athlete-navbar.component.html',
  styleUrls: ['./athlete-navbar.component.css']
})

/**
 * This component is the navigation bar of the athlete view, it allows to change routes between
 * search items, user settings, available challenges and the home-view
 */
export class NavbarComponent implements OnInit {
  @ViewChild('searchForm') searchForm: NgForm;
  defaultCategory = 'athletes';
  changedView: boolean;

  constructor(private aService: AthleteService, private router: Router, private server:ServerService) { }

  ngOnInit(): void {
    this.changedView = this.aService.changedView;
  }

  /**
   * Is called when the search form is used
   */
  onSearch(): void{
    // We announce the search
    console.log('Search item: ' + this.searchForm.value.searchItem + ',on ' + this.searchForm.value.category + ' category.');

    // We activate the return button
    this.onAthleteViewChanged();

    // We set the search type
    this.aService.searchType = this.searchForm.value.category;

    // Call the server
    this.aService.setSearhData(this.server.getSearchData(this.searchForm.value.searchItem));

    // We go to the search page
    this.router.navigate(['/athlete/search']);
  }

  /**
   * This method keeps track of the changed state of the athlete home view,
   * in other words it indicates when the athlete home page is not being displayed
   */
  onAthleteViewChanged(): void {
    this.aService.changedView = true;
  }

  /**
   * This method is called when the athlete home page view is returned
   */
  onAthleteViewReturned(): void {
    this.aService.changedView = false;
  }

  /**
   * This method takes us to a specified page after login in
   * @param pageName to navigate to
   */
  goToPage(pageName: string): void{
    this.router.navigate([`${pageName}`]);
    console.log('Login form');
  }

  /**
   * This method allows the user to ends its session
   */
  onAthleteLogout(): void {
    this.aService.logout();
    this.goToPage('');
  }
}
