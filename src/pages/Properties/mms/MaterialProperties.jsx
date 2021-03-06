import EntityProperties from "@properties/framework/EntityProperties";
import MaterialTable from "@components/mms/table/MaterialTable";

export default class MaterialProperties extends EntityProperties{

    static displayName = 'MaterialProperties';
    
    buildTable = () => {
        return <MaterialTable {...this.getDefaultTableProps()} />
    }

}