import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginActions } from 'src/app/modules/login/store/actions/login-type';
import { selectIsLoggedIn } from 'src/app/modules/login/store/selectors/login-selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}
  isLoggedIn$!: Observable<boolean>;
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
  logOut() {
    this.store.dispatch(LoginActions.logout());
  }
}
