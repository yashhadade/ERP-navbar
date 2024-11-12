import { useEffect } from "react";
import axios from "axios";
import ServerApi from "../ServerApi";

const useCustomReactForExcel = (urlPath, id) => {
  const apiUrl = ServerApi(); // Get the base API URL
console.log(id);
  useEffect(() => {
    // Only call the download function if id is valid
    if (id) {
      const downloadExcel = async () => {
        try {
          // Make the GET request with responseType "blob" to handle Excel (binary data)
          const response = await axios.get(`${apiUrl}/${urlPath}/${id}`, {
            responseType: "blob",
          });

          // Create a Blob from the response and trigger the download
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          // Create an anchor element to simulate a click and trigger the download
          const link = document.createElement("a");
          link.href = url;
          link.download = "feedback.xlsx"; // You can customize the filename
          link.click();

          // Clean up the object URL after download
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error downloading Excel file:", error);
        }
      };

      // Trigger download if the id is set
      downloadExcel();
    }
  }, [id, urlPath, apiUrl]); // Re-run whenever `id` or `urlPath` changes

  return null; // No need to return anything from this hook
};

export default useCustomReactForExcel;
