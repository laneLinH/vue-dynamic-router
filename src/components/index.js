import dynamicTable from './dynamicTable'
import dynamicModal from './dynamicModal'
import dynamicForm from './dynamicForm'
import dynamicButton from './dynamicButton'
// import dynamicTreeTable from './dynamicTreeTable'
import dynamicVx from './dynamicVx/dynamicVx'
import {$dealTableDate,$typeOf,$deepClone,$formatDate ,contactObj,print} from './dynamicVx/tools'
const components = [
    dynamicTable,
    dynamicModal,
    dynamicForm,
    dynamicButton,
    // dynamicTreeTable
]
const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    Vue.prototype.$dynamicBus=new Vue()
    Vue.prototype.$typeOf = $typeOf
    Vue.prototype.$deepCopy = $deepClone
    Vue.prototype.$formatDate = $formatDate
    Vue.prototype.$dealTableDate = $dealTableDate
    Vue.prototype.$print=print
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    dynamicTable,
    dynamicModal,
    dynamicForm,
    dynamicButton,
    // dynamicTreeTable,
    dynamicVx
}

export {
    install,
    dynamicTable,
    dynamicModal,
    dynamicForm,
    dynamicButton,
    // dynamicTreeTable,
    dynamicVx
}
