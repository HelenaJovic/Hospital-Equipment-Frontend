import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { CompanyServiceService } from 'src/app/feature-moduls/company/service/company-service.service';
import { CompanyAdministrator } from 'src/app/model/companyAdministrator.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
 

  user :User={
    id:0,
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    phoneNumber:'',
    occupation:'',
    address: {
      id:0,
      street: '',
      city: '',
      country:'',
      number: '',
      longitude:0,
      latitude:0
    },
    waslogged: false,
    username: ''
    


  }
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private companyService: CompanyServiceService
  ) {}

 
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  LogIn() {
    const user: any = {
      username: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe((data) => {
      console.log(data);
      this.userForm.reset();
      const rola = this.authService.getUserRole();
     
      if(rola=="ROLE_COMPANY_ADMIN" || rola=="ROLE_SYSTEM_ADMIN"){
        this.changePassword();
      }else{
        this.router.navigate(['showCompanyProfile']);
      }
    
    });


  }

  Rola() {
    const rola = this.authService.getUserRole();
    console.log(rola);
  }

 

 

  changePassword(){
    const id= this.authService.getUserId();
  
    this.companyService.getUserById(parseInt(id,10)).subscribe({
      next:(response)=>{
        this.user=response;
        console.log(response);
        if(this.user.waslogged==false){
          this.router.navigate(['/changePassword/'+ this.user.id]);
        }else{
          this.router.navigate(['showCompanyProfile']);
        }
      }
    })
  }
 
}
