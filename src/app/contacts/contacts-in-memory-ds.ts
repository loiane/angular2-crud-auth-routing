export class ContactsInMemoryDS {
  createDb() {
    let contacts = [
      {
        id: 1,
        name: 'Tyrion',
        email: 'tyrion@email.com',
        phone: {
          phoneNumber: '99876-1234'
        }
      },
      {
        id: 2,
        name: 'Gandalf',
        email: 'gandalf@email.com',
        phone: {
          phoneNumber: '98887-6789'
        }
      }
    ];
    return { contacts };
  }
}
