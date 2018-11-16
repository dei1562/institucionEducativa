import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorLetra'
})
export class FiltroPorLetraPipe implements PipeTransform {

  transform(value: any, search: string): any {
    if(search == '') {
      return value;
    }

    let arrayTemp = [];
    for(let i=0; i<value.length; i++){

      let nombre = value[i].nombre;
      
      if(nombre.toLowerCase().indexOf(search.toLowerCase()) >= 0){
        arrayTemp.push(value[i])
      }
    }

    return arrayTemp;
  }

}
