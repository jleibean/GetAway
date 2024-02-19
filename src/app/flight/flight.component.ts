import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatAutocompleteModule, MatButtonModule, MatTooltip, MatIconModule],
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css', '../app.component.css'],
  providers: [provideNativeDateAdapter()],
})

export class FlightComponent {
  router: Router = inject(Router);
  filteredAirlines: Observable<string[]>;
  success:null | boolean = null;
  errorMessage = null;
  airlines = ["Aegean Airlines", "Aer Lingus", "Aeroflot", "Aerolineas Argentinas", "Aeromexico", "Air Arabia", "Air Astana", "Air Austral", "Air Baltic", "Air Belgium", "Air Canada", "Air Caraibes", "Air China", "Air Corsica", "Air Dolomiti", "Air Europa", "Air France", "Air India", "Air India Express", "Air Macau", "Air Malta", "Air Mauritius", "Air Namibia", "Air New Zealand", "Air North", "Air Seoul", "Air Serbia", "Air Tahiti Nui", "Air Transat", "Air Vanuatu", "AirAsia", "AirAsia X", "Aircalin", "Alaska Airlines", "Alitalia", "Allegiant", "American Airlines", "ANA", "Asiana", "Austrian", "Avianca", "Azerbaijan Hava Yollary", "Azores Airlines", "Azul", "Bamboo Airways", "Bangkok Airways", "British Airways", "Brussels Airlines", "Caribbean Airlines", "Cathay Dragon", "Cathay Pacific", "Cayman Airways", "CEBU Pacific Air", "China Airlines", "China Eastern", "China Southern", "Condor", "Copa Airlines", "Croatia Airlines", "Czech Airlines", "Delta", "easyJet", "Edelweiss Air", "Egyptair", "EL AL", "Emirates", "Ethiopian Airlines", "Etihad", "Eurowings", "EVA Air", "Fiji Airways", "Finnair", "flydubai", "FlyOne", "French bee", "Frontier", "Garuda Indonesia", "Gol", "Gulf Air", "Hainan Airlines", "Hawaiian Airlines", "Helvetic Airways", "HK Express", "Hong Kong Airlines", "Iberia", "Icelandair", "IndiGo Airlines", "InterJet", "Japan Airlines", "Jeju Air", "Jet2", "JetBlue", "Jetstar", "Jin Air", "Kenya Airways", "KLM", "Korean Air", "Kulula", "La Compagnie", "LATAM", "Lion Airlines", "LOT Polish Airlines", "Lufthansa", "Luxair", "Malaysia Airlines", "Mango", "Middle East Airlines", "Nok Air", "Nordwind Airlines", "Norwegian Air International", "Norwegian Air Shuttle", "Norwegian Air Sweden", "Norwegian Air UK", "Oman Air", "Pakistan International Airlines", "Peach", "Pegasus Airlines", "Philippine Airlines", "Porter", "Qantas", "Qatar Airways", "Regional Express", "Rossiya - Russian Airlines", "Royal Air Maroc", "Royal Brunei", "Royal Jordanian", "RwandAir", "Ryanair", "S7 Airlines", "SAS", "Saudia", "Scoot Airlines", "Shanghai Airlines", "Silkair", "Silver", "Singapore Airlines", "Skylanes", "South African Airways", "Southwest", "SpiceJet", "Spirit", "Spring Airlines", "Spring Japan", "SriLankan Airlines", "Sun Country", "Sunclass Airlines", "Sunwing", "SWISS", "Swoop", "TAAG", "TACA", "TAP Portugal", "THAI", "tigerair Australia", "Transavia Airlines", "TUI UK", "TUIfly", "Tunis Air", "Turkish Airlines", "Ukraine International", "United", "Ural Airlines", "UTair Aviation", "Uzbekistan Airways", "Vietnam Airlines", "Virgin Atlantic", "Virgin Australia", "Vistara", "Viva Aerobus", "Volaris", "Volotea", "Vueling Airlines", "WestJet", "Wizzair", "Xiamen Airlines"];

  constructor(private http: HttpClient) {
    this.filteredAirlines = this.flightForm.controls['airline']?.valueChanges.pipe(
      startWith(''),
      map(air => air ? this.filter(air) : this.airlines),
    )
  }

  private filter(value: string): string[] {
    return this.airlines.filter(option => {
      return option.toLowerCase().match(value.toLowerCase());
    });
  }


  flightForm = new FormGroup({
    airline: new FormControl<string>('', [Validators.required]),
    flightNumber: new FormControl<string>('', [Validators.required]),
    numOfGuests: new FormControl<Number>(2, [Validators.required, Validators.min(1)]),
    arrivalDate: new FormControl<string>('', [Validators.required, this.dateValidator]),
    arrivalTime: new FormControl<string>('', [Validators.required]),
    comments: new FormControl<string>('')
  });

  private dateValidator(c: AbstractControl): { [key: string]: boolean } {
    return new Date(c.value) < new Date() ? {'dateInvalid': true} : {};
  }

  saveFlight() {
    !this.flightForm.value.comments ? delete this.flightForm.value.comments : undefined;
    console.log(this.flightForm.value);
    const url = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';
    const headers = { candidate: "Jacqueline Quidas", token: "WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh" };
  //   this.http.post<any>(url, this.flightForm.value, { headers }).subscribe({
  //     next: () => {
  //         this.router.navigate(['/success']);
  //     },
  //     error: error => {
  //         this.success = false;
  //         this.errorMessage = error.message;
  //     }
  // });
  }
}
