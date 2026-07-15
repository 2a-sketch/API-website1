import React from 'react';

export const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

const MOTION_PROPS = new Set([
    'initial','animate','exit','whileInView','whileHover','whileTap',
    'whileFocus','whileDrag','variants','transition','viewport',
    'layout','layoutId','drag','dragConstraints','dragElastic',
    'onAnimationStart','onAnimationComplete','onDragStart','onDragEnd',
    'custom','inherit'
]);

// Cache components so React doesn't remount on every render
const componentCache = {};

function getShimComponent(tag) {
    if (!componentCache[tag]) {
        componentCache[tag] = React.forwardRef(function MotionShim(props, ref) {
            const cleanProps = {};
            for (const key in props) {
                if (!MOTION_PROPS.has(key)) {
                    cleanProps[key] = props[key];
                }
            }
            if (ref) cleanProps.ref = ref;
            return React.createElement(tag, cleanProps);
        });
        componentCache[tag].displayName = 'motion.' + tag;
    }
    return componentCache[tag];
}

function createMotionProxy() {
    return new Proxy({}, {
        get(target, prop) {
            return getShimComponent(prop);
        }
    });
}

export const mobileMotionProxy = isMobileDevice ? createMotionProxy() : null;

export const mobileAnimatePresenceShim = isMobileDevice
    ? function AnimatePresenceShim(props) { return props.children; }
    : null;
