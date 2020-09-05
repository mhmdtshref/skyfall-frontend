import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spyfall-frontend';

  constructor(private translateService: TranslateService) {
    SharedService.language = 'en';
    translateService.setDefaultLang(SharedService.language);
  }

  updateLanguage() {
    this.translateService.use(SharedService.language);
  }

}
