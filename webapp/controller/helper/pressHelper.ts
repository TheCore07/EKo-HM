import { GenericTile$PressEvent } from "sap/m/GenericTile";
import Controller from "sap/ui/core/mvc/Controller";
import { dialogHelper } from "./dialogHelper";
import { languageHelper } from "./languageHelper";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace ekohm.ekohm.controller.helper
 */
export default class pressHelper {

    //#region press
    /**
     * 
     * @param oEvent the press Event on the tile
     * @param that oController
     * @param onDialogConfirmed function that gets executed when the dialog is confirmed
     * @returns 
     */
    public static press(
        oEvent: GenericTile$PressEvent, 
        that: Controller,
        onDialogConfirmed: () => void
    ) {
        const oTile = oEvent.getSource(); // the tile that was pressed

        const sModelName = oTile.data("model"); // gets the Modelname from the CustomData
        const sI18nTitlyKey = oTile.data("i18nPopUpTitle"); // gets the Popuptitle from the CustomData
        const sI18nMessageKey = oTile.data("i18nPopUpMessage"); // gets the Popupmessage from the CustomData

        if (!sModelName) { // checks if the Modelname is avaiable
            console.warn("No Modelname in CustomData!");
            return;
        } 

        const oModel = that.getView()?.getModel(sModelName); // gets the Model using the Modelname
        if (!oModel) { //checks if the Model is avaiable
            console.warn(`Model ${sModelName} not found!`);
            return;
        }

        const bIsCreated = oModel.getProperty("/isCreated"); // gets the "isCreated" Property from the Model
        if (!bIsCreated) { // checks if the Database Entry is already created
            const sTitle = languageHelper.getI18nText(that, sI18nTitlyKey); // gets the title from i18n
            const sMessage = languageHelper.getI18nText(that, sI18nMessageKey); // gets the message from i18n
            dialogHelper.showConfirm( // Displays the Popup using the Title, Message and confirmation function
                sMessage,
                sTitle,
                onDialogConfirmed
            )
        } else {
            console.log(`${sModelName} already created`)
            const sAlreadyCreated = languageHelper.getI18nText(that, "createPopup_alreadyCreated"); // i18n Property for "already exists" text
            MessageToast.show(sAlreadyCreated, { // shows a MessageToast with the string above
                at: "CenterCenter",
                duration: 3000
            })
        }
    }//#endregion press
}