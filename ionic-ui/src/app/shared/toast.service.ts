import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private toastController: ToastController){}

    public async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            color: color
        });
        toast.present();
    }
}
