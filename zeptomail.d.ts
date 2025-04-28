declare module 'zeptomail' {
    export interface EmailAddress {
      email?: string;
      name?: string;
      address?: string;
      email_address?: EmailAddress
    }
  
    export interface EmailOptions {
      from: EmailAddress;
      to: EmailAddress[];
      subject?: string;
      cc?: EmailAddress[];
      bcc?: EmailAddress[];
      reply_to?: EmailAddress;
      htmlbody?: string;
      textbody?: string;
      attachments?: any[];
      headers?: Record<string, string>;
      mail_template_key?: string;
      template_alias?: string;
      template_key?: string;
      [key: string]: any;
    }
  
    export interface SendMailOptions {
      token: string;
      url?: string;
      debug?: boolean;
      domain?: string;
    }
  
    export interface ClientOptions {
      host?: string;
      isUrlAPI?: boolean;
      useHttps?: boolean;
      authHeader?: string;
    }
  
    export class Client {
      constructor(options: SendMailOptions, clientOption?: ClientOptions);
  
      getUrl(url: string): string;
      getHeader(): Record<string, string>;
      status(resp: Response): Promise<Response>;
      toJSON(resp: Response): Promise<any>;
      validate(query: { options: EmailOptions; isTemplate?: boolean }): boolean;
      resultWithBody(method: string, query: any, url: string): Promise<any>;
      httpRequest(fetched: Promise<Response>): Promise<any>;
    }
  
    export class SendMailClient extends Client {
      constructor(options: SendMailOptions, clientOption?: ClientOptions);
  
      sendMail(options: EmailOptions): Promise<any>;
      sendBatchMail(options: EmailOptions): Promise<any>;
      sendMailWithTemplate(options: EmailOptions): Promise<any>;
      mailBatchWithTemplate(options: EmailOptions): Promise<any>;
    }
  }
  