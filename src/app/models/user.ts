export class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;

    constructor(user?: User) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.phone = user.phone;
            this.username = user.username;
            this.website = user.website;
        }else{
            this.id = null;
            this.name = '';
            this.email = '';
            this.phone = '';
            this.username = '';
            this.website = '';
        }
    }
}