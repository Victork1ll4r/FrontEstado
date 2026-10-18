import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadoService } from '../../Servicios/estado-service';
import { Estado } from '../../Interfaces/estado';

@Component({
  selector: 'app-dialogo-insertar-editar-estado',
  standalone: false,
  styleUrl: './dialogo-insertar-editar-estado.css',
  templateUrl: './dialogo-insertar-editar-estado.html',
})
export class DialogoInsertarEditarEstado implements OnInit {
  formEstado: FormGroup;
  tituloFormulario: string = "Nuevo";
  tituloBoton: string = "Guardar";

  constructor(private dialogoReferencia: MatDialogRef<DialogoInsertarEditarEstado>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private estadoServicio: EstadoService,
    @Inject(MAT_DIALOG_DATA) public dataEditarEstado: Estado
  ) {
    this.formEstado = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.dataEditarEstado) {
      this.formEstado.patchValue({
        id: this.dataEditarEstado.id || 0,
        nombre: this.dataEditarEstado.nombre,
        descripcion: this.dataEditarEstado.descripcion,
        activo: this.dataEditarEstado.activo
      });
      this.tituloBoton = "Actualizar";
      this.tituloFormulario = "Editar";
    }
  }

  agregarInsertarEstado() {
    const modelo: Estado = {
      id: this.dataEditarEstado ? this.dataEditarEstado.id : 0,
      nombre: this.formEstado.value.nombre,
      descripcion: this.formEstado.value.descripcion,
      activo: this.formEstado.value.activo
    }

    if (this.dataEditarEstado == null) {

      this.estadoServicio.insertarEstado(modelo).subscribe({
        next: (respuesta) => {
          this.alerta("Estado creado correctamente", "Listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.alerta("Error al crear el estado", "Error");
        }
      })
    } else {
      this.estadoServicio.actualizarEstado(modelo).subscribe({
        next: (respuesta) => {
          this.alerta("Estado actualizado correctamente", "Listo");
          this.dialogoReferencia.close("actualizado");
        }, error: (e) => {
          this.alerta("Error al actualizar el estado", "Error");
        }
      })
    }
  }

  alerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }
}