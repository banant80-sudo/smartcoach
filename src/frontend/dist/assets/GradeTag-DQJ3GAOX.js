import { c as createLucideIcon } from "./createLucideIcon-yiondUdy.js";
import { u as useLanguage, j as jsxRuntimeExports } from "./index-CJdRh2sV.js";
import { G as Grade } from "./useBackend-Bv6kT19D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
function GradeTag({ grade, className = "" }) {
  const { t } = useLanguage();
  const gradeKey = grade;
  const label = t[gradeKey];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20 ${className}`,
      children: label
    }
  );
}
const GRADE_ORDER = [
  Grade.lkg,
  Grade.ukg,
  Grade.std1,
  Grade.std2,
  Grade.std3,
  Grade.std4,
  Grade.std5,
  Grade.std6,
  Grade.std7,
  Grade.std8,
  Grade.std9,
  Grade.std10
];
export {
  BookOpen as B,
  GRADE_ORDER as G,
  GradeTag as a
};
