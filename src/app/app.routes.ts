import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];
