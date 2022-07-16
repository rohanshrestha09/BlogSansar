export class RegisterDto {
  readonly fullname: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly confirmpassword: string;
}

export class LoginDto {
  readonly username: string;
  readonly password: string;
}

export class ProfileDto {
  readonly id: string;
  readonly fullname: string;
  readonly username: string;
  readonly email: string;
  readonly bio: string;
  readonly imgurl: string;
}
