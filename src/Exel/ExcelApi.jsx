import { useEffect } from "react";
import axios from "axios";
import ServerApi from "../ServerApi";

const useCustomReactForExcel = (urlPath, id) => {
  const apiUrl = ServerApi();
  // console.log(id);
  useEffect(() => {
    if (id) {
      const downloadExcel = async () => {
        try {
          const response = await axios.get(`${apiUrl}/${urlPath}/${id}`, {
            responseType: "blob",
          });
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "feedback.xlsx";
          link.click();

          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error downloading Excel file:", error);
        }
      };

      downloadExcel();
    }
  }, [id, urlPath, apiUrl]);

  return null;
};

export default useCustomReactForExcel;
