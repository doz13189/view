import nodeOps from './nodeOps.js'
import { createVNode } from './text/renderer.js'

function patch(prevNode, nextNode, container) {

    let el
    if (prevNode.type !== nextNode.type) {
        el = nextNode.el = nodeOps.create(nextNode.type)
        nodeOps.append(container, el)
    } else {
        el = nextNode.el = prevNode.el
    }

    for (const key in nextNode.props) {
        const prevProp = prevNode.props[key]
        const nextProp = nextNode.props[key]

        if (prevProp !== nextProp) {
            if (key.startsWith('on')) {
                if (!prevProp || (prevProp.toString() !== nextProp.toString())) {
                    nodeOps.on(el, key.substring(2).toLowerCase(), () => {
                        nextProp()
                    })
                }
            } else {
                nodeOps.setAttr(el, key, nextProp);
            }
        }
    }

    if (nextNode.children instanceof Array) {
        nextNode.children.forEach((child, index) => {
            if (prevNode.children.hasOwnProperty(index)) {
                patch(prevNode.children[index], child, el)
            } else {
                patch(createVNode(), child, el)
            }
        })
    } else {
        if (prevNode.children !== nextNode.children) {
            nodeOps.insertHtml(el, nextNode.children)
        }
    }
}

export { patch }
