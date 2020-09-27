import nodeOps from './nodeOps.js'
import { patch } from './render.js'
import { createVNode } from './vnode.js'

function createApp(args) {
    const { data, render } = args
    const app = {}
    // const rawData = data()

    app.publicCtx = new Proxy(data(), {
        get(target, key, receiver) {
            console.log('get')
            return target[key]
        },
        set(target, key, value, receiver) {
            console.log('set', target, key, value, receiver)
            const res = target[key] = value



            return res
        }
    })
    app.render = render

    app.mount = function(selector, document) {
        const container = nodeOps.querySelector(selector, document)
        app.vnode = createVNode()
        const nextVNode = render.call(app.publicCtx)
        patch(app.vnode, nextVNode, container)
        app.vnode = nextVNode
    }
    return app
}

export { createApp }

