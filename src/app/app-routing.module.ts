import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingPageComponent } from './billing-page/billing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "bill/:billUrl",
    component: BillingPageComponent
  }
,
{
  path:"**",
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
