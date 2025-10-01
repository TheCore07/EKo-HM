import Controller from "sap/ui/core/mvc/Controller";
import { modelHelper } from "./helper/modelHelper";
import Router from "sap/ui/core/routing/Router";
import Component from "../Component";
import { Button$PressEvent } from "sap/m/Button";
import { GenericTile$PressEvent } from "sap/m/GenericTile";
import pressHelper from "./helper/pressHelper";

/**
 * @namespace ekohm.ekohm.controller
 */
export default class Dashboard extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    //#region onInit
    public onInit(): void {
        this.loadModels();

        const oRouter = this.getRouter();
        if (!oRouter) {
            throw new Error("Router nicht gefunden!");
        }
        oRouter.getRoute("Dashboard")!.attachPatternMatched(this.onRouteMatched, this);

    }//#endregion onInit


    //#region onRouteMatched
    public onRouteMatched(oEvent: any): void {

    }//#endregion onRouteMatched


    //#region loadModels
    /**
     * loads all Models 
     */
    private loadModels(): void {
        modelHelper.setModel(this, {"isCreated": false}, "SystemUser");
    }//#endregion loadModels


    //#region onPress
    /**
     * the function thats beeing triggered if a tile is pressed
     * @param oEvent the press Event on the tile
     */
    public onGenericTilePress(oEvent: GenericTile$PressEvent): void {
        pressHelper.press(
            oEvent, 
            this, 
            this.onDialogConfirmed.bind(this)
        );
    }//#endregion onPress
    

    //#region onDialogConfirmed
    /**
     * the function thats triggerd if the dialog is confirmed
     */
    private onDialogConfirmed(): void {
        const oModel = modelHelper.getModel(this, "SystemUser");
        const bIsCreated = oModel?.getProperty("/isCreated");
        console.log(bIsCreated);
        oModel?.setProperty("/isCreated", !bIsCreated);
    }//#endregion onDialogConfirmed


    //#region onJumpToGroup
    /**
     * 
     * @param oEvent the event thats beeing triggerded if the Nav button is clicked
     */
    public onJumpToGroup(oEvent: Button$PressEvent): void {
        const oButton = oEvent.getSource();
        const sGroupId = oButton.data("group"); 
        const oGroup = this.byId("group_" + sGroupId);

        if (!oGroup) {
            console.warn("Group not found!");
            return;
        }

        oGroup.getDomRef()?.scrollIntoView({ behavior: "smooth" });
    }//#endregion onJumpToGroup


    //#region getRouter
    /**
     * gets the router of the View
     * @returns the Router 
     */
    private getRouter(): Router | undefined {
        return (this.getOwnerComponent() as Component | undefined)?.getRouter();
    }//#endregion getRouter

}