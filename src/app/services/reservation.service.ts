import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'https://localhost:44336/api/';  // Backend API URL

  constructor(private http: HttpClient) { }

  // Rezervasyonları listele
  getReservations(): Observable<any> {
    return this.http.get(this.apiUrl + 'Reservation');
  }

  // Yeni rezervasyon oluştur
  createReservation(reservation: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Reservation/create', reservation);
  }


  // Rezervasyonu güncelle
  updateReservation(reservationId: number, reservation: any): Observable<any> {
    return this.http.put(this.apiUrl + `Reservation/${reservationId}`, reservation);
  }


  // Rezervasyon sil
  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(this.apiUrl + `Reservation/${reservationId}`);
  }
}
