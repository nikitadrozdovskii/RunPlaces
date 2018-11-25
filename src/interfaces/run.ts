import {Place} from './place';

export class Run{
    constructor(
                public date: string, 
                public distance: number,
                public pace: number,
                public places: Place[],
                public id = ''
                 ){}
                
}