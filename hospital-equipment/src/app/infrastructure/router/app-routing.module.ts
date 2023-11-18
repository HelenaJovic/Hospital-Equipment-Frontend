import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { ShowCompanyProfileComponent } from 'src/app/feature-moduls/company/components/show-company-profile/show-company-profile.component';
import { UpdateCompanyComponent } from 'src/app/feature-moduls/company/components/update-company/update-company.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {path:'showCompanyProfile', component:ShowCompanyProfileComponent},
  {path: 'updateCompany', component: UpdateCompanyComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
