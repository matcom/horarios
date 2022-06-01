import { TypeclassCreateDto } from './typeclass.create.dto';


export type TypeclassUpdateDto = Partial<TypeclassCreateDto> & {
  typeclassId: string
}
