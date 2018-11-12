import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@shared/shared.module';

// Components
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreComponent } from './core.component';

// Services
import { HttpService } from './http.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { SharedService } from './shared.service'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports: [HeaderComponent, NavbarComponent],
  declarations: [HeaderComponent, NavbarComponent, CoreComponent],
  providers: [HttpService, AuthenticationService, AuthGuard, AdminAuthGuard, SharedService]
})
export class CoreModule { }
