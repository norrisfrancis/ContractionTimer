import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'app-Home',
    templateUrl: 'Home/Home.component.html',
    styleUrls: ['Home/Home.component.css']
})
export class HomeComponent implements OnInit {
    private isLoading = true;
    private canGoBack: boolean;

    constructor(
        private router: RouterExtensions,
        private page: Page
    ) {}

    ngOnInit() {
        this.page.actionBarHidden = false;
        this.canGoBack = this.router.canGoBackToPreviousPage();
    }

    public btnStart = () => {
        // This code will be called only in Android.
        console.log('Navigation button tapped!');
        this.router.navigate(['timer']);
    }

}
