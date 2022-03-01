import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import Swal from 'sweetalert2';
import { RolService } from './services/rol/rol.service';
import { UsuarioService } from './services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuarioForm!: FormGroup;
  filterForm!: FormGroup;
  roles: any;
  usuarios!: any;
  filterPost = '';
  contador = 0;

  constructor(
    public fg: FormBuilder,
    public rolService: RolService, 
    public usuarioService: UsuarioService,
  ){

  }

  ngOnInit(): void {
    this.usuarioForm = this.fg.group({
      id:[''],
      nombreUsuario : ['', Validators.required],
		  activo : ['', Validators.required],
		  rol : ['', Validators.required],
    })

    this.rolService.getAllRoles().subscribe(res => {
      this.roles = res;
    },
    error => (console.error(error))
    )

    this.usuarioService.getAllUsuarios().subscribe(res => {
      this.usuarios = res;
    },
    error => (console.error(error))
    )
  }


  guardar():void{
    this.usuarioService.saveUsuario(this.usuarioForm.value).subscribe(res => {
      if(res){
        this.usuarioForm.reset();
        this.usuarios = this.usuarios.filter((usuario: { id: any; }) => res.id!==usuario.id);
        window.location.reload();
      }else{
        console.log("El usuario ya existe");
      }
    },
    error => (console.error(error))
    )
  }

  limpiarFiltro():void{
      this.filterPost = '';
  }

  eliminar(usuario: any){
    Swal.fire({
      text: 'Esta seguro de borrar el usuario "'+usuario.nombreUsuario+'"?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario.id).subscribe(res => {
          window.location.reload();
        },
        error => (console.error(error))
        )

      }
    })

  }

  editar(usuario: any){
    this.contador++;
    this.usuarioForm.setValue({
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario+" ",
		  activo : usuario.activo,
		  rol : '',
    })
  }  
}
