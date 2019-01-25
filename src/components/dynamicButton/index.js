import dynamicButton from './dynamicButton'
dynamicButton.install=(Vue)=>{
  Vue.component(dynamicButton.name, dynamicButton);
}
export default dynamicButton
