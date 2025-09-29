import MessageBox from "sap/m/MessageBox";

export class dialogHelper {

    /**
     * Zeigt einen Basic Dialog an den man eine Folgefunktion hängen kann
     * 
     * @param message The text that is beeing displayed in the dialog
     * @param title The Title of the Dialog
     * @param onConfirm The following function thats beeing triggered when the dialog was confirmed
     */
    public static showConfirm(
        message: string,
        title: string,
        onConfirm: () => void
    ): void {
        MessageBox.confirm(
            message, 
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