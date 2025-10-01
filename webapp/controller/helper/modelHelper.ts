import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ekohm.ekohm.controller.helper
 */
export class modelHelper {

    /**
     * 
     * @param that oController
     * @param data is the Data thats is going to get set
     * @param name is the name of the Model
     */
    public static setModel(
        that: Controller, 
        data: object | JSONModel, 
        name: string
    ): void {
        const oModel = data instanceof JSONModel ? data : new JSONModel(data);
    
        const oView = that.getView();
        if (oView) {
            oView.setModel(oModel, name);
        } else {
            console.warn("View was not found!");
        }
    }

    /**
     * 
     * @param that oController
     * @param name name of the Model
     * @returns the model with the name
     */
    public static getModel(that: Controller, name: string): JSONModel | undefined {
        const oView = that.getView();
        if (oView) {
            const model = oView.getModel(name);
            if (model instanceof JSONModel) {
                return model;
            }
        } else {
            console.warn("View was not found!");
        }
        return undefined;
    }
}
