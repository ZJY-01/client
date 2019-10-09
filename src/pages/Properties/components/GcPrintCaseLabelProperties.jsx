import EntityViewProperties from "./entityProperties/EntityViewProperties";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Button } from "antd";
import IconUtils from "../../../api/utils/IconUtils";
import { DefaultRowKey } from "../../../api/const/ConstDefine";
import { Notification } from "../../../components/notice/Notice";
import PrintUtils from "../../../api/utils/PrintUtils";
import GetPrintBboxParameterRequest from "../../../api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest";
import { PrintServiceUrl } from "../../../api/gc/GcConstDefine";

/**
 * 打印箱标签
 */
export default class GcPrintCaseLabelProperties extends EntityViewProperties{

    static displayName = 'PrintCaseLabelProperties';
    
    afterQuery = (responseBody) => {
        let queryDatas = responseBody.dataList;
        if (queryDatas && queryDatas.length > 0) {
            queryDatas[0].printNumber = 2;
            this.setState({
                formObject: queryDatas[0]
            })  
            this.form.resetFormFileds();
        } else {
            this.setState({
                formObject: []
            })  
            this.showDataNotFound();
        }
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        let self = this;
        let materialLotRrn = this.state.formObject[DefaultRowKey];
        if (!materialLotRrn) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLotRrn : materialLotRrn,    
            success: function(responseBody) {
                let url = PrintServiceUrl.Bbox;
                PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, self.entityForm.getFieldValue("printNumber"));
            }
        }
        GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }
    
}

const styles = {
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};