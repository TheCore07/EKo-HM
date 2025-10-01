import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ekohm.ekohm.controller.helper
 */
export class languageHelper {

    /**
     * 
     * @param that oController
     * @param property the Property you want to get out of the i18n Bundle
     * @param args optional arguments for getText Method
     * @returns the Property as a string
     */
    public static getI18nText(
        that: Controller,
        property: string,
        args?: any[]
    ): string {
        const oView = that.getView();
        if (!oView) {
            console.warn("View not found on Controller!");
            return "";
        }

        const i18nModel = oView.getModel("i18n") as ResourceModel | undefined;
        if (!i18nModel) {
            console.warn("i18n Model not found!");
            return "";
        }

        const i18nBundle = i18nModel.getResourceBundle() as ResourceBundle;
        return i18nBundle.getText(property, args) as string;
    }
}