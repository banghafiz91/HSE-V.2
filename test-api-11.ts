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

  await testJSON({ route: "login" });
  await testJSON({ path: "login" });
  await testJSON({ endpoint: "login" });
  await testJSON({ task: "login" });
  await testJSON({ mode: "login" });
  await testJSON({ do: "login" });
  await testJSON({ cmd: "login" });
}

test();
