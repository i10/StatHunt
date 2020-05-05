/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const DISPLAYNAME_PREFIX = "Blueprint3";
/** A collection of curated prop keys used across our Components which are not valid HTMLElement props. */
const INVALID_PROPS = [
    "active",
    "alignText",
    "containerRef",
    "current",
    "elementRef",
    "fill",
    "icon",
    "inputRef",
    "intent",
    "inline",
    "large",
    "loading",
    "leftIcon",
    "minimal",
    "onChildrenMount",
    "onRemove",
    "panel",
    "panelClassName",
    "popoverProps",
    "rightElement",
    "rightIcon",
    "round",
    "small",
    "text",
];
/**
 * Typically applied to HTMLElements to filter out blacklisted props. When applied to a Component,
 * can filter props from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the blacklist (only appropriate for HTMLElements).
 * @param props The original props object to filter down.
 * @param {string[]} invalidProps If supplied, overwrites the default blacklist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidProps and blacklist together.
 */
export function removeNonHTMLProps(props, invalidProps = INVALID_PROPS, shouldMerge = false) {
    if (shouldMerge) {
        invalidProps = invalidProps.concat(INVALID_PROPS);
    }
    return invalidProps.reduce((prev, curr) => {
        if (prev.hasOwnProperty(curr)) {
            delete prev[curr];
        }
        return prev;
    }, { ...props });
}
//# sourceMappingURL=props.js.map