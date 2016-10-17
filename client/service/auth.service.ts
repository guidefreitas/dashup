import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
    public User: {
        _id: string,
        email: string,
        name: string
    };
}
