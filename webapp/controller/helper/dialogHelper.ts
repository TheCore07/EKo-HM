import MessageBox from "sap/m/MessageBox";

/**
 * @namespace ekohm.ekohm.controller.helper
 */
export class dialogHelper {

    /**
     * Zeigt einen Basic Dialog an den man eine Folgefunktion hängen kann
     * 
     * @param message The text that is beeing displayed in the dialog
     * @param title The Title of the Dialog
     * @param onConfirm The following function thats beeing triggered when the 
     *                  dialog was confirmed (The function needs a .bind(this) in the controller so it wont loose its Context)
     */
    public static showConfirm(
        message: string | undefined,
        title: string | undefined,
        onConfirm: () => void
    ): void {
        MessageBox.confirm(
            message as string, 
            {
                title: title,
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: (sAction: string) => {
                    if (sAction === MessageBox.Action.OK) {
                        onConfirm();
                    }
                }
            }
        );


    

    }
}