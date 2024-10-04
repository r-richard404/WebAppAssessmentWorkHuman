import { Component, OnInit } from '@angular/core'; //onInit used for ....
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

 countries: string[] = [];
 searchQuery: string = '';

 constructor(private countryService: CountryService) {}

 ngOnInit() {
   this.loadCountries();
 }

 loadCountries() {
  this.countryService.getCountries().subscribe((data) => {
    this.countries = data;
  });
}
  searchCountries() {
    this.countryService.searchCountries(this.searchQuery).subscribe((data) => {
      this.countries = data;
    });
  }
}
