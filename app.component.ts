import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators, FormGroupName
} from "@angular/forms";
import {HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HttpService]
})
export class AppComponent {
  title = 'Data-driven form';
  myForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private service: HttpService){
    this.myForm = this.formBuilder.group({
      'user': formBuilder.group({
        'name':['',[Validators.required]],
        'email': ['',[Validators.required,Validators.email]],
        'post': ['testing',[Validators.minLength(10)]]
      })
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  // minimumLength(control: FormControl): {[s: string]: boolean}{
  //   if(control.value.length < 10){
  //     return { example: true};
  //   }
  //
  //   return null;
  // }

  onSubmit() {
    console.log(this.myForm.value);
  }

  getData(){
    let post: string = "";
    let name: string = "";
    let email: string = "";
    this.service.getUserDetail().subscribe(
      (respond) => {
          //console.log(JSON.stringify(respond));
          name = respond.json().name;
          email = respond.json().email;
      },
      (error)=> console.log(error),
      () => {
        console.log("completed");
        (<FormGroup>this.myForm.controls['user']).controls['name'].setValue(name);
        (<FormGroup>this.myForm.controls['user']).controls['email'].setValue(email);
      }
    );

    this.service.getUserPosts().subscribe(
      (respond) => {
        //console.log(JSON.stringify(respond));
        post = respond.json()[0].body;
      },
      (error)=> console.log(error),
      () => {
        console.log("completed");
        (<FormGroup>this.myForm.controls['user']).controls['post'].setValue(post);
      }
    );




    console.log(this.myForm);
  }
}
