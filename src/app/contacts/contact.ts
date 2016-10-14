import { Phone } from './phone';

export class Contact {
  id: number;
  name: string;
  email: string;
  phone: Phone = new Phone();
}
