import nodeOps from './nodeOps.js'

function patch(prevNode, nextNode, container) {
    let el
    if (prevNode.type !== nextNode.type) {
        nextNode.el = nodeOps.create(nextNode.type)
        nodeOps.append(container, nextNode.el)
    }
    // } else {
    //     nextNode.el = prevNode.el
    // }

    if (prevNode.children !== nextNode.children) {
        nodeOps.insertHtml(nextNode.el, nextNode.children)
    }

    for (const key in nextNode.props) {
        console.log('key', key)
        const prevProp = prevNode.props[key]
        const nextProp = nextNode.props[key]

        if (prevProp !== nextProp) {
            if (key.startsWith('on')) {
                nodeOps.on(nextNode.el, key.substring(2).toLowerCase(), () => {
                    nextProp()
                })
            } else {
                nodeOps.setAttr(nextNode.el, key, nextProp);
            }
        }
    }




}

export { patch }
