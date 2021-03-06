import EntityDialog from '@components/framework/dialog/EntityDialog';
import MaterialLotInvManagerRequest from '@api/material-lot-inv-manager/MaterialLotInvManagerRequest';

export default class TransferMLotInventoryDialog extends EntityDialog {
    static displayName = 'TransferMLotInventoryDialog';

    handleSave = () => {
        var self = this;
        let transferInvObject = this.props.object;
        let object = {
            transferInvObject : transferInvObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLotInventory);
                }
            }
            
        }
        MaterialLotInvManagerRequest.sendTransferStockRequest(object);
    }
}

 
