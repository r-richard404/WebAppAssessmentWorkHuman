import { Component, OnInit } from '@angular/core'; //onInit used for ....
import { CountryService } from './services/country.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

//Metadata
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [FormsModule, HttpClientModule, CommonModule]
})

//Defining the main app component
export class AppComponent implements OnInit {
 countries: string[] = []; //Array to hold country names
 searchTerm: string = ''; //Variable to hold the current search term

 //Injecting the CountryService
 constructor(private countryService: CountryService) {}

 //Loading countries when the component initialises (fetching initial data)
 ngOnInit() {
   this.loadCountries();
 }

 //Calling the service to get the list of countries
 loadCountries() {
  this.countryService.getCountries().subscribe((data) => {
    this.countries = data;//Storing the retrieved countries in the component state
  });
}
  //Calling the service to search for countries based on the search term
  searchCountries() {
    //searchTerm bounded to HTML input
    this.countryService.searchCountries(this.searchTerm).subscribe((data) => {
      this.countries = data; //Updating the countries array with the search results
    });
  }
}
