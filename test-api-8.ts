async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwMNwiT6YUdO-DiS_wXEx9eSnwQlNC1w79DT7h_8T6Bt_iQ-0qtnuQlVTLRb77GDj0U/exec";
  
  async function testJSON(payload) {
    console.log("Testing:", JSON.stringify(payload));
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      console.log("Result:", await res.text());
    } catch(e) {
      console.error(e);
    }
  }

  await testJSON({ command: "login", email: "x", password: "y" });
  await testJSON({ endpoint: "login", email: "x", password: "y" });
  await testJSON({ method: "login", email: "x", password: "y" });
  await testJSON({ function: "login", email: "x", password: "y" });
  await testJSON({ req: "login", email: "x", password: "y" });
  await testJSON({ type: "login", email: "x", password: "y" });
  await testJSON({ operation: "login", email: "x", password: "y" });
  await testJSON({ Action: "login", email: "x", password: "y" });
}
test();
