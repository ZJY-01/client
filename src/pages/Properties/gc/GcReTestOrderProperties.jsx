import EntityProperties from "@properties/framework/EntityProperties";
import OrderTable from "@components/gc/table/OrderTable";
import { ActionType } from "@api/gc/async-manager/AsyncManagerRequestBody";
import GcReTestOrderMLotProperties from "./GcReTestOrderMLotProperties";

export default class GcReTestOrderProperties extends EntityProperties{

    static displayName = 'GcReTestOrderProperties';
    
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <OrderTable {...this.getDefaultTableProps()} scrollY={200} 
                            ref={(orderTable) => { this.orderTable = orderTable }} 
                            pagination={false} 
                            asyncType={ActionType.AsyncMaterialOutOrder} />
    }

    buildOtherComponent = () => {
        return <GcReTestOrderMLotProperties {...this.getDefaultTableProps()} 
                                            orderTable={this.orderTable} 
                                            tableRrn={9912} 
                                            resetFlag={this.state.resetFlag}></GcReTestOrderMLotProperties>
    }
}