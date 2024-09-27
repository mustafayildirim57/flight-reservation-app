import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  reservationForm!: FormGroup;
  reservationId!: number;
  flightId!: number;  // Uçuş ID'sini almak için
  userId!: number;    // Kullanıcı ID'sini almak için

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    // Formu oluşturuyoruz
    this.reservationForm = this.fb.group({
      flightInfo: [{ value: '', disabled: true }, Validators.required], // Uçuş bilgisi alanı
      userName: [{ value: '', disabled: true }, Validators.required],   // Kullanıcı adı alanı
      numberOfSeats: ['', [Validators.required, Validators.min(1)]],
      reservationDate: ['', Validators.required]
    });

    this.reservationId = +this.route.snapshot.paramMap.get('id')!;

    // Backend'den mevcut rezervasyon bilgilerini alalım
    this.reservationService.getReservations().subscribe(data => {
      const reservation = data.find((r: any) => r.id === this.reservationId);

      if (reservation) {
        // flightId ve userId'yi set ediyoruz
        this.flightId = reservation.flightId;
        this.userId = reservation.userId;

        // Mevcut rezervasyon bilgilerini form'a yükleyelim
        this.reservationForm.patchValue({
          flightInfo: `${reservation.flight.departureCity} - ${reservation.flight.arrivalCity}`,  // Uçuş Bilgisi
          userName: `${reservation.user.firstName} ${reservation.user.lastName}`,  // Kullanıcı Adı
          numberOfSeats: reservation.numberOfSeats,
          reservationDate: reservation.reservationDate.split('T')[0]  // Tarih formatı düzeltildi
        });
      } else {
        console.error('Rezervasyon bulunamadı.');
      }
    });
  }

  updateReservation() {
    if (this.reservationForm.valid) {
      const reservationDto = {
        flightId: this.flightId,  // Uçuş bilgisi
        userId: this.userId,      // Kullanıcı bilgisi
        numberOfSeats: this.reservationForm.get('numberOfSeats')?.value,
        reservationDate: this.reservationForm.get('reservationDate')?.value
      };

      // Backend'e güncellenmiş DTO verilerini gönderelim
      this.reservationService.updateReservation(this.reservationId, reservationDto).subscribe(response => {
        alert('Rezervasyon başarıyla güncellendi!');
        this.router.navigate(['/reservations']);
      }, error => {
        console.error('Rezervasyon güncellenirken hata oluştu:', error);
        alert('Rezervasyon güncellenemedi, lütfen tekrar deneyin.');
      });
    }
  }
}
