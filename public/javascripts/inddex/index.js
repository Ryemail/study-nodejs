async function getUserInfo() {
    const result = await axios.get("/user");
    console.log(result);
}
