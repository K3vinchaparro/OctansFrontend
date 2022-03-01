import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    if(value){
      for(const post of value) {
        if(post.nombreUsuario.toLowerCase().indexOf(arg.toLowerCase())> -1){
          resultPost.push(post);
        };
      };
    }
    return resultPost;
  }

}


