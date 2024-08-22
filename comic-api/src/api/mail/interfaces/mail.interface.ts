export type MailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
};
