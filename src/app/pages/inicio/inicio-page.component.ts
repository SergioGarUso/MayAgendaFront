import { Component, signal } from "@angular/core";


@Component({
    templateUrl: './inicio-page.component.html',
})

export class InicioPageComponent{
    nombreAppSignal= signal("BackApiMay");
}