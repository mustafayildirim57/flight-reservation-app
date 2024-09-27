import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  reservationForm!: FormGroup;
  flightId!: number;
  userId!: string | null;

  constructor(private fb: FormBuilder, private reservationService: ReservationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.flightId = Number(this.route.snapshot.paramMap.get('flightId'));
    this.userId = localStorage.getItem('userId');
  
    if (!this.userId) {
      alert('Giriş yapmanız gerekmektedir.');
      this.router.navigate(['/login']);
      return;
    }

    this.reservationForm = this.fb.group({
      flightId: [{ value: this.flightId, disabled: true }, Validators.required],
      userId: [{ value: this.userId, disabled: true }, Validators.required],
      numberOfSeats: ['', [Validators.required, Validators.min(1)]],
      reservationDate: ['', Validators.required]
    });
  }

  createReservation() {
    if (this.reservationForm.valid) {
      const reservationDto = {
        flightId: this.flightId,
        userId: this.userId,
        numberOfSeats: this.reservationForm.get('numberOfSeats')?.value,
        reservationDate: this.reservationForm.get('reservationDate')?.value
      };
  
      this.reservationService.createReservation(reservationDto).subscribe(response => {
        alert('Rezervasyon başarıyla oluşturuldu!');
        this.router.navigate(['/reservations']); // Başarılı işlem sonrası yönlendirme
      }, error => {
        console.error('Rezervasyon oluşturulurken hata oluştu:', error);
        alert('Rezervasyon oluşturulamadı, lütfen tekrar deneyin.');
      });
    } else {
      alert('Lütfen formu doğru doldurunuz!');
    }
  }
  
}
