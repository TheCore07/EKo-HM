import Controller from "sap/ui/core/mvc/Controller";
import { modelHelper } from "./helper/modelHelper";
import { dialogHelper } from "./helper/dialogHelper";
import Router from "sap/ui/core/routing/Router";
import Component from "../Component";

/**
 * @namespace ekohm.ekohm.controller
 */
export default class Dashboard extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    //#region onInit
    public onInit(): void {
        this.loadModels();

        const oOwnerComponent = this.getOwnerComponent();
        const oRouter = oOwnerComponent.getRouter();
        oRouter.getRoute("dashboard").attachPatternMatched(this.onRouteMatched);
    }//#endregion onInit

    //#region onRouteMatched
    public onRouteMatched(oEvent: any): void {
        const i18nBundle = this.getView().getModel("i18n").getResourceBundle();
    }//#endregion onRouteMatched

    //#region loadModels
    private loadModels(): void {
        modelHelper.setModel(this, {"isCreated": false}, "SystemUser");
    }//#endregion loadModels

    //#region onPress
    public onPress(): void {
        // dialogHelper.showConfirm(
        this.onDialogConfirmed()
    }//#endregion onPress
    
    //#region onDialogConfirmed
    private onDialogConfirmed(): void {
        const oModel = modelHelper.getModel(this, "SystemUser");
        const bIsCreated = oModel?.getProperty("/isCreated");
        console.log(bIsCreated);
        oModel?.setProperty("/isCreated", !bIsCreated);
    }//#endregion onDialogConfirmed

    //#region onJumpToGroup
    public onJumpToGroup(oEvent: any) {
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
    private getRouter(): Router | undefined {
        return (this.getOwnerComponent() as Component | undefined)?.getRouter();
    }//#endregion getRouter

}