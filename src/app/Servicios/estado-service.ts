import { Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Estado } from '../Interfaces/estado';

@Injectable({providedIn: 'root'})
export class EstadoService {
    private URL:string = environment.endPoint;

    constructor(private http: HttpClient) { }

    listarEstados():Observable<Estado[]> {
        return this.http.get<Estado[]>(`${this.URL}/Lista`);
    }

    insertarEstado(modelo: Estado):Observable<Estado> {
        return this.http.post<Estado>(`${this.URL}/Crear`, modelo);
    }

    actualizarEstado(modelo: Estado):Observable<Estado> {
        return this.http.put<Estado>(`${this.URL}/Actualizar`, modelo);
    }

    eliminarEstado(id: number):Observable<Estado> {
        return this.http.delete<Estado>(`${this.URL}/Eliminar/${id}`);
    }
}
