import { Component, inject} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: false,
  
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
formBuilder = inject(FormBuilder);
userForm:FormGroup = this.formBuilder.group({
name:['',[Validators.required]],
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.minLength(8)]],
age:['',Validators.required],
address:['',Validators.required]
});
userService = inject(UserService)
router = inject(Router)
route = inject(ActivatedRoute)
editUserid!: string;
ngOnInit() {
 this.editUserid = this.route.snapshot.params['id']
if(this.editUserid){
  this.userService.getUser(this.editUserid).subscribe(result=>{
    this.userForm.patchValue(result)
  })
}
}
addUser(){
  if (this.userForm.invalid) {
    alert("Please provide all fields with valid data");
    return
  }
  const model:User=this.userForm.value;
  this.userService.addUser(model).subscribe(result=>{
alert("User added successfully");
this.router.navigateByUrl("/");
  })
  // console.log(this.userForm.value)
}

updateUser(){
  if (this.userForm.invalid) {
    alert("Please provide all fields with valid data");
    return
  }
  const model: User = this.userForm.value;
  this.userService.updUser(this.editUserid, model).subscribe(result=>{
    alert("user update successfully")
    this.router.navigateByUrl('/')
  })
}
}
