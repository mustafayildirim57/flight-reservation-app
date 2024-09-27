import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  // Rezervasyonları yükleme
  loadReservations() {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  // Rezervasyon silme işlemi
  deleteReservation(reservationId: number) {
    if (confirm("Bu rezervasyonu silmek istediğinizden emin misiniz?")) {
      this.reservationService.deleteReservation(reservationId).subscribe(() => {
        alert("Rezervasyon başarıyla silindi.");
        this.loadReservations();  // Listeyi güncelle
      });
    }
  }
}
