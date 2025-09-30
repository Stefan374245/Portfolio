import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const breakpointSm = 600;

  // Unter 600px: 132vh
  if (width <= breakpointSm) {
    document.body.style.backgroundPosition = '0 128vh';
    return;
  }

  // 601px bis 1249px: 142vh
  if (width < 1250) {
    document.body.style.backgroundPosition = '0 132vh';
    return;
  }

  // 1250px bis 1500px: 132vh
  if (width <= 1500) {
    document.body.style.backgroundPosition = '0 132vh';
    return;
  }

  // Über 1500px: 132vh
  document.body.style.backgroundPosition = '0 117vh';
});
window.dispatchEvent(new Event('resize'));