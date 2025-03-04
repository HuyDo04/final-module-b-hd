//lấy dữ liệu từ API
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Lỗi kết nối API");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

//POST dữ liệu lên API
export async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi gửi dữ liệu lên API", error);
        return null;
    }
}
