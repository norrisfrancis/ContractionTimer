import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { MomentModule } from 'angular2-moment';

// Services
import { TimerService } from "./services/timer.service";

// Stores
import { TimerStore } from "./stores/timer.store";

// Pipes
import { Sort } from "./pipes/sort";

// Components
import { HomeComponent } from "./Home/Home.component";
import { TimerComponent } from "./Timer/Timer.component";

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
