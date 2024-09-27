import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css']
})
export class FlightFilterComponent implements OnInit {

  filterForm: FormGroup;
  flights: any[] = [];

  constructor(private flightService: FlightService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      departureCity: [''],
      arrivalCity: [''],
      flightDate: ['']
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    const filters = this.filterForm.value;
    this.flightService.filterFlights(filters).subscribe((data: any[]) => {
      this.flights = data;
    }, error => {
      console.error('Filtreleme hatası:', error);
    });
  }
}
