import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { FlightCreateComponent } from './components/flight-create/flight-create.component';
import { ReservationCreateComponent } from './components/reservation-create/reservation-create.component';
import { ReservationEditComponent } from './components/reservation-edit/reservation-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'flights', component: FlightListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'create-flight', component: FlightCreateComponent },
  { path: 'reservation-create', component: ReservationCreateComponent },
  { path: 'reservation-edit/:id', component: ReservationEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'create-reservation/:flightId/:userId', component: ReservationCreateComponent }, // Dinamik rota
  
  // Default yönlendirme
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }  // Geçersiz rota durumunda yönlendirme
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
