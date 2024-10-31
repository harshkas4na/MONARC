export const uploadImageToIPFS = async (file: File) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-to-ipfs", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    throw error;
  }
};