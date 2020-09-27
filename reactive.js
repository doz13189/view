
let activeEffect = null
function effect(fn) {
    activeEffect = fn
    activeEffect()
    return activeEffect
}

const targetMap = new WeakMap();
function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }

    if (!deps.has(activeEffect)) {
        deps.add(activeEffect)
    }
    
}

function trigger (target, key) {
    const depsMap = targetMap.get(target)
    const deps = depsMap.get(key);
    deps.forEach(effect => {
        effect()
    })
}

export { effect, trigger, track }
