import dynamicModal from './dynamicModal'
dynamicModal.install=(Vue)=>{
  Vue.component(dynamicModal.name,dynamicModal );
}
export default dynamicModal
