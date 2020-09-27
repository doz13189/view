// import { create } from "domain"
export default  {
    querySelector(selector, scope) {
        return scope.querySelector(selector)
    },
    create(type) {
        return document.createElement(type)
    },
    setAttr(target, key, value) {
        target.setAttribute(key, value)
    },
    append(parent, target) {
        parent.append(target)
    },
    insertHtml(target, value) {
        target.innerHTML = value
    },
    on(target, eventType, callback) {
        
        console.log(target, eventType, callback)
        target.addEventListener(eventType, () => {
            callback()
        })
    }
}