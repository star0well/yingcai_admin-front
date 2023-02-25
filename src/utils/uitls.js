import localCache from "@/utils/cache";

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 */
export function debounce(func, wait, immediate) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

export const getImg = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return [];
  }
};

export const setUserInfo = (info) => {
  let saveUserInfo = localCache.getCathe("saveUserInfo") || [];
  if (saveUserInfo) {
    let bz = false;
    for (let i = 0; i < saveUserInfo.length; i++) {
      if (saveUserInfo[i].id == info.id) {
        bz = true;
        saveUserInfo[i] = info;
        break;
      }
    }
    if (!bz) {
      saveUserInfo.push(info);
    }
    localCache.setCache("saveUserInfo", saveUserInfo);
  }
};
/**
 *
 * @param {*} str 取值字符串 ps:"a.b"
 * @param {*} target 目标 {a:{b:12}}
 * @returns 12
 */
export const getValueByStr = (str, target) => {
  const arry = str.split(".");

  return arry.reduce((pre, curr) => pre?.[curr], target) ?? "";
};
export const saveAs = (href, fileName, toBlob) => {
  const isBlob = href instanceof Blob || toBlob;
  if (!fileName && typeof href === "string" && (href.startsWith("http") || href.startsWith("https"))) {
    fileName = href.slice(href.lastIndexOf("/") + 1);
  }
  fileName = decodeURIComponent(fileName || "download");
  if (typeof href === "string" && toBlob) href = new Blob([href], toBlob);
  if (href instanceof Blob) href = URL.createObjectURL(href);
  const aLink = document.createElement("a");
  aLink.setAttribute("href", href);
  aLink.setAttribute("download", fileName);
  aLink.click();
  // const evt = document.createEvent("HTMLEvents");
  // evt.initEvent("click", false, false);
  // aLink.dispatchEvent(evt);
  if (isBlob) setTimeout(() => URL.revokeObjectURL(aLink.href), 100);
  return aLink;
};
/**
 * base64转file
 * base64格式：data:image/png;base64,iVBORw0KGgoAAAANSU...
 * @param {*} dataURL base64编码数据
 * @param {*} filename 文件名称
 */
export function dataURLToFile(dataURL, filename) {
  const arr = dataURL.split(","),
    mime = arr[0].match(/:(.*?);/)[1], //mime类型 image/png
    bstr = atob(arr[1]); //base64 解码

  let n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
  //return new Blob([a8arr], {type: mime});
}
/**
 * Array 转 Tree
 * 前提：每一项都有parentId，根元素
 * @param { Array } list 数组
 * @param { String } rootId 根元素Id
 * @param { Object } param2 可配置参数
 */

export const generateTree = (
  list,
  rootId = 0,
  { idName = "area_code", parentIdName = "parent_code", childName = "children" } = {},
) => {
  if (!Array.isArray(list)) {
    new Error("type only Array");
    return list;
  }
  const objMap = {}; //暂存数组以 id 为 key的映射关系
  const result = []; // 结果

  for (const item of list) {
    const id = item[idName];
    const parentId = item[parentIdName];

    // 该元素有可能已经放入map中，（找不到该项的parentId时 会先放入map
    objMap[id] = !objMap[id]
      ? item
      : {
          ...item,
          ...objMap[id],
        };

    const treeItem = objMap[id]; // 找到映射关系那一项（注意这里是引用）

    if (parentId === rootId) {
      // 已经到根元素则将映射结果放进结果集
      result.push(treeItem);
    } else {
      // 若父元素不存在，初始化父元素
      if (!objMap[parentId]) {
        objMap[parentId] = [];
      }

      // 若无该根元素则放入map中
      if (!objMap[parentId][childName]) {
        objMap[parentId][childName] = [];
      }
      objMap[parentId][childName].push(treeItem);
    }
  }
  return result;
};
