import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = 'https://localhost:44336/api/';  // Backend API URL

  constructor(private http: HttpClient) { }

  // Uçuşları listele
  getFlights(): Observable<any> {
    return this.http.get(this.apiUrl + 'Flight');
  }

  // Rezervasyon oluştur
  createReservation(reservation: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Reservation', reservation);
  }

  // Uçuşları filtrele
  filterFlights(filters: any): Observable<any> {
    const queryParams = new HttpParams({ fromObject: filters });
    return this.http.get(this.apiUrl + 'Flight/filter', { params: queryParams });
  }
  
  

  // Uçuş oluştur
  createFlight(flight: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Flight/add', flight);  // 'add' endpoint'ini kullanarak uçuş ekleme
  }    

  // Uçuş sil
  deleteFlight(flightId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Flight/${flightId}`);
  }

  // Uçuş yolcu kontrolü (İptal ederken kontrol edeceğimiz kısım)
  checkPassengers(flightId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}Flight/checkPassengers/${flightId}`);
  }
}
