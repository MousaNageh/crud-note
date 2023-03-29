export interface LogInPayload {
  password: string;
  email: string;
}
export interface LogInResponse {
  refresh: string;
  access: string;
}
