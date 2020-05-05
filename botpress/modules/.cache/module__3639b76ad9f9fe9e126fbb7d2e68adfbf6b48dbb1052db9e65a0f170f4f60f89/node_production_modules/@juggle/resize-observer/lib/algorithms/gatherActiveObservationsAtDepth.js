import { resizeObservers } from '../utils/resizeObservers';
import { calculateDepthForNode } from './calculateDepthForNode';
import { cache as sizeCache } from './calculateBoxSize';
var gatherActiveObservationsAtDepth = function (depth) {
    sizeCache.clear();
    resizeObservers.forEach(function processObserver(ro) {
        ro.activeTargets.splice(0, ro.activeTargets.length);
        ro.skippedTargets.splice(0, ro.skippedTargets.length);
        ro.observationTargets.forEach(function processTarget(ot) {
            if (ot.isActive()) {
                if (calculateDepthForNode(ot.target) > depth) {
                    ro.activeTargets.push(ot);
                }
                else {
                    ro.skippedTargets.push(ot);
                }
            }
        });
    });
};
export { gatherActiveObservationsAtDepth };
