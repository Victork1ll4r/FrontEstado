import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogoInsertarEditarEstado } from './dialogo-insertar-editar-estado';

describe('DialogoInsertarEditarEstado', () => {
  let component: DialogoInsertarEditarEstado;
  let fixture: ComponentFixture<DialogoInsertarEditarEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoInsertarEditarEstado],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogoInsertarEditarEstado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
