import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { ProfileDto } from '../model/profile-dto.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  
  profile: ProfileDto = new ProfileDto('', '', new Date() , '', '');

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (response : any) => {
        console.log(response);
        this.profile = new ProfileDto(response.fullName, response.companyEmail, response.dob, response.department, response.jobDepartment);
      },
      error: (error : any) => {
        console.log(error.status);
      },
      complete: () => {} 
    })
  }

}
