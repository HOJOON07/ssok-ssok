import { render } from '../index';

export const { useState, useEffect } = (function makeMyHooks() {
    let hookIndex = 0;
    const hooks = [];

    function useState(initialValue) {
        const state = hooks[hookIndex] === undefined ? initialValue : hooks[hookIndex];

        hooks[hookIndex] = state;

        const setState = (function () {
            const currentIndex = hookIndex;

            return newState => {
                hooks[currentIndex] = newState;
                hookIndex = 0;
                render();
            };
        })();

        hookIndex++;

        return [state, setState];
    }

    function useEffect(effect, deps) {
        const prevDeps = hooks[hookIndex];

        const isFirstCall = () => prevDeps === undefined;
        const isDepsNotProvided = () => deps === undefined;
        const hasDepsChanged = () => deps.some((dep, index) => dep !== prevDeps[index]);

        if (isFirstCall() || isDepsNotProvided() || hasDepsChanged()) {
            effect();
        }

        hooks[hookIndex] = deps;
        hookIndex++;
    }

    return { useState, useEffect };
})();
