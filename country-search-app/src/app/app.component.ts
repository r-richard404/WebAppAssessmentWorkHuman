import { Component, OnInit } from '@angular/core'; //onInit used for ....
import { CountryService } from './services/country.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [FormsModule, HttpClientModule, CommonModule]
})

export class AppComponent implements OnInit {

 countries: string[] = [];
 //searchQuery: string = '';
 searchTerm: string = '';

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
    //this.searchQuery
    console.log('Searching for:', this.searchTerm); //log the search term
    this.countryService.searchCountries(this.searchTerm).subscribe((data) => {
      console.log('Search results:', data) //log the data returned
      this.countries = data;
    });
  }
}
