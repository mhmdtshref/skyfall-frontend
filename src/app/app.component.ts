import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './shared/services/shared.service';
import { SocketService } from './shared/services/socket.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'spyfall-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spyfall-frontend';

  constructor(private translateService: TranslateService) {
    SharedService.language = 'en';
    translateService.setDefaultLang(SharedService.language);
    SocketService.socket = io(environment.baseApiUrl);
  }

  updateLanguage = () => {
    this.translateService.use(SharedService.language);
  }

}