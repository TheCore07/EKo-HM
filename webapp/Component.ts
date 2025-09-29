import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import Localization from "sap/base/i18n/Localization";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ekohm.ekohm
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
	};

	public init() : void {
		// call the base component's init function
        super.init();

        // set the device model
        this.setModel(createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();

        const lang = this._getLanguageFromCookie() || navigator.language || "en"; // sets the language code and if none are avaiable "en" is chosen as default

        Localization.setLanguage(lang.toUpperCase()); // sets the language code into the configuration 

        const i18nModel = new ResourceModel({ // creates the i18n ResourceModel
            bundleName: "ekohm.ekohm.i18n.i18n",
            bundleLocale: lang
        });
        this.setModel(i18nModel, "i18n"); // sets the i18n Model in the Component

	}

    /**
     * 
     * @returns The language Code from the cookie as a string
     */
    private _getLanguageFromCookie(): string | null {
        const match = document.cookie.match(/sap-language=([A-Za-z]+)/);
        return match ? match[1] : null;
    }
}