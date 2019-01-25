import dynamicForm from './dynamicForm'
dynamicForm.install=(Vue)=>{
  Vue.component(dynamicForm.name, dynamicForm);
}
export default dynamicForm
