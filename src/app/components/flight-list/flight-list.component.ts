import { Component, OnInit, ViewChild } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights = new MatTableDataSource<any>([]); // flights artık MatTableDataSource türünde
  isAdmin: boolean = false;
  filterForm!: FormGroup;
  selectedFlightId: number | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.isAdmin = email === 'admin@example.com';  // Kullanıcı admin mi kontrol et

    this.loadFlights();

    // Filtre formunu oluşturuyoruz
    this.filterForm = this.fb.group({
      departureCity: [''],
      arrivalCity: [''],
      flightDate: ['']
    });
  }     

  // Tüm uçuşları yükleme
  loadFlights() {
    this.flightService.getFlights().subscribe(data => {
      this.flights.data = data;
      this.flights.sort = this.sort;  // Sıralama işlevini tabloya bağlayın
    });
  }

  // Filtreleme işlemi
  applyFilter() {
    const filters = this.filterForm.value;
    let queryParams: any = {};
  
    // Boş olmayan değerleri gönderiyoruz
    if (filters.departureCity && filters.departureCity.trim() !== '') {
      queryParams.departureCity = filters.departureCity;
    }
    if (filters.arrivalCity && filters.arrivalCity.trim() !== '') {
      queryParams.arrivalCity = filters.arrivalCity;
    }
    if (filters.flightDate) {
      queryParams.flightDate = filters.flightDate;
    }

    if (Object.keys(queryParams).length === 0) {
      // Eğer sorgu parametreleri boş ise, tüm uçuşları yükleriz
      this.loadFlights();
      return;
    }

    console.log(queryParams);  // Parametrelerin doğruluğunu kontrol etmek için log ekleyin
  
    // API'ye sadece dolu olan parametrelerle istek yapıyoruz
    this.flightService.filterFlights(queryParams).subscribe(data => {
      this.flights.data = data;
      this.flights.sort = this.sort;  // Sıralama fonksiyonunu tekrar ata
    }, error => {
      console.error('Filtreleme sırasında hata oluştu:', error);
    });
  }

  // Uçuş silme işlemi (sadece admin)
  deleteFlight(flightId: number) {
    if (this.isAdmin) {
      if (confirm('Bu uçuşu silmek istediğinizden emin misiniz?')) {
        this.flightService.deleteFlight(flightId).subscribe(() => {
          alert('Uçuş başarıyla silindi.');
          this.loadFlights(); // Uçuş listesini tekrar yükle
        });
      }
    } else {
      alert('Bu işlemi yapmak için yetkiniz yok.');
    }
  }

  // Seçilen uçuşu al
  onFlightSelect(flightId: number) {
    this.selectedFlightId = flightId;
  }

  // Rezervasyon devam etme işlemi
  continueReservation() {
    const userId = localStorage.getItem('userId'); // Giriş yapan kullanıcı ID'sini al
    console.log('Seçilen uçuş ID:', this.selectedFlightId); // Konsola yazdır
    console.log('Kullanıcı ID:', userId); // Konsola yazdır

    if (userId && this.selectedFlightId) {
      this.router.navigate(['/create-reservation', this.selectedFlightId, userId]); // Uçuş ve kullanıcı ID'si ile yönlendir
    } else {
      console.error('Uçuş veya kullanıcı ID bulunamadı');
    }
  }
}
