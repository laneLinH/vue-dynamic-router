import dynamicTable from './dynamicTable'
dynamicTable.install=(Vue)=>{
  Vue.component(dynamicTable.name,dynamicTable );
}
export default dynamicTable
