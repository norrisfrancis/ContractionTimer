import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MomentModule } from 'angular2-moment';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

// Services
import { TimerService } from './Timer/timer.service';

// Stores
import { TimerStore } from './Timer/timer.store';

// Pipes
import { Sort } from './pipes/sort';

// Components
import { HomeComponent } from './Home/Home.component';
import { TimerComponent } from './Timer/Timer.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        MomentModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TimerComponent,
        Sort
    ],
    providers: [
        TimerService,
        TimerStore
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
