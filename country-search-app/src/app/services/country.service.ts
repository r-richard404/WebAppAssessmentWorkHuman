//Importing Angular core module and HTTP client module
import { HttpClient } from '@angular/common/http'; //making HTTP requests
import { Injectable } from '@angular/core'; //defining a service
import { Observable } from 'rxjs'; //handling asynchronous data streams

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  //API URL for backend to provite list of countries
  private apiUrl = 'http://localhost:3000/countries';

  //Injecting HttpClient into the constructor to make HTTP requests
  constructor(private http: HttpClient) {}

  //Method to retrieve list of countries from backend
  getCountries(): Observable<string[]> {
    //Use GET request to apiUrl and return Obs string
    return this.http.get<string[]>(this.apiUrl);
  }

  //Method to search for countries based on provided query
  searchCountries(query: string): Observable<string[]> {
    //Use GET request with a query parameter and return Obs string
    return this.http.get<string[]>(`${this.apiUrl}?query=${query}`);
  }
}
