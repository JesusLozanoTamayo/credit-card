import { ClienteModel } from './client.model';
import { InfoTarjetasModel } from './infotarjetas.model';

export interface InfoClienteModel {

    cliente: ClienteModel;
    informacionTarjeta: InfoTarjetasModel;

}
