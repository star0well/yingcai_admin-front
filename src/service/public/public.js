import { dowloadReq } from "@/service/index";

/**
 *
 * @param {Blob} data
 * @returns
 */
export const imgUpload = (data, config) => {
  let formData = new FormData();
  formData.append("file", data);
  return dowloadReq.post({
    url: "/api/upload/upImg",
    data: formData,
    sucessTips: "上传成功",
    showReault: true,
    ...config,
  });
};
