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

  await testJSON({ aksi: "login" });
  await testJSON({ aksi: "masuk" });
  await testJSON({ aksi: "daftar" });
  await testJSON({ action: "Masuk" });
  await testJSON({ action: "Daftar" });
  await testJSON({ Action: "Masuk" });
  await testJSON({ type: "login" });
  await testJSON({ action: "masuk" });
  await testJSON({ action: "daftar" });
  await testJSON([{ action: "login" }]);
}

test();
