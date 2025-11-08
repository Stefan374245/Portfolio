import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const breakpointSm = 600;

  if (width <= breakpointSm) {
    document.body.style.backgroundPosition = '0 128vh';
    return;
  }

  if (width < 1250) {
    document.body.style.backgroundPosition = '0 132vh';
    return;
  }

  if (width <= 1500) {
    document.body.style.backgroundPosition = '0 132vh';
    return;
  }

  document.body.style.backgroundPosition = '0 117vh';
});
window.dispatchEvent(new Event('resize'));