import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Form yapısını oluşturuyoruz
    this.flightForm = this.fb.group({
      departureCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      flightDate: ['', Validators.required],  // Tarih alanı
      flightTime: ['', Validators.required],  // Saat alanı
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  createFlight() {
    if (this.flightForm.valid) {
      const formValues = this.flightForm.value;
  
      // flightTime'ı string olarak 'HH:mm:ss' formatına çeviriyoruz
      const formattedFlightTime = formValues.flightTime + ':00';  // Örn: '15:50' -> '15:50:00'
      
      const flightData = {
        ...formValues,
        flightTime: formattedFlightTime  // flightTime'ı uygun formata çevirip ekledik
      };
  
      // Gönderilen verileri kontrol etmek için console.log ile yazdıralım
      console.log('Gönderilen veriler:', flightData);
  
      // Backend'e veri gönderiyoruz
      this.flightService.createFlight(flightData).subscribe(response => {
        alert('Uçuş başarıyla oluşturuldu!');
        // this.flightForm.reset();
        this.router.navigate(['/flights']);
      }, error => {
        console.error('Hata:', error);  // Hata çıktısını alalım
        alert('Uçuş oluşturulurken bir hata oluştu!');
      });
    } else {
      alert('Lütfen formu doğru doldurunuz!');
    }
  }
  
}
