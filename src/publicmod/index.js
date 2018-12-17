// ----- 1
import * as publicmodel from './publicmodel'
// ----- 2
const components = {
    ...publicmodel,
}

// ----- 3
const install = function (Vue, Option) {
    // ----- 4
//  es6遍历  Object.keys(components).forEach((key)=>{})
     Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })

}

// ----- 5
export default {
    install
}