import nodeOps from './nodeOps.js'

function patch(prevNode, nextNode, container) {
    let el
    if (prevNode.type !== nextNode.type) {
        el = nextNode.el = nodeOps.create(nextNode.type)
        nodeOps.append(container, el)
    } else {
        el = nextNode.el = prevNode.el
    }

    if (prevNode.children !== nextNode.children) {
        nodeOps.insertHtml(el, nextNode.children)
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




}

export { patch }
