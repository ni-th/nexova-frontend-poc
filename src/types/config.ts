export interface DBConfig {
  id?: number
  host: string;
  username: string;
  port: number | null;
  password: string;
  databaseName: string;
}

export interface EmailConfig {
  apiKey: string;
  senderEmail: string;
}

export interface SmsConfig {
  apiKey: string;
  senderNumber: string;
}
