import nodeOps from './nodeOps.js'
import { patch } from './render.js'
import { createVNode } from './vnode.js'
import { effect, track, trigger } from './reactive.js'

function createApp(args) {
    const { data, methods, computed: computedData, render } = args
    const app = {}
    const ctx = { ...data(), ...methods, ...computedData }
    // const rawData = data()

    app.publicCtx = new Proxy(ctx, {
        get(target, key, receiver) {
            // console.log('get', target, key)
            track(target, key)
            return target[key]
        },
        set(target, key, value, receiver) {
            // console.log('set', target, key, value, receiver)
            target[key] = value
            trigger(target, key)
            return true

            // const res = target[key] = value
            // (index):24 Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'total'
            // return res
        }
    })
    // app.render = render

    app.mount = function(selector, document) {
        const container = nodeOps.querySelector(selector, document)
        
        app.vnode = createVNode()
        effect(() => {
            // console.log('re rendering')
            const nextVNode = render.call(app.publicCtx)
            patch(app.vnode, nextVNode, container)
            app.vnode = nextVNode
        })

    }
    return app
}

export { createApp }

