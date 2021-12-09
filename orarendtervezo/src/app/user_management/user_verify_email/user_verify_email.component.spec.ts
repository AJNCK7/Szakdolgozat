import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifyEmailComponent } from './user_verify_email.component';

describe('UserVerifyEmailComponent', () => {
  let component: UserVerifyEmailComponent;
  let fixture: ComponentFixture<UserVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerifyEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
