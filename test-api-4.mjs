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

  await testJSON({ action: "Login", email: "test@example.com", password: "123" });
  await testJSON({ action: "login", email: "test@example.com", password: "123" });
  await testJSON({ action: "register", email: "test@example.com", password: "123" });
  await testJSON({ action: "REGISTER", email: "test@example.com", password: "123" });
  
  // What if action wasn't the term?
  await testJSON({ type: "login", email: "test@example.com", password: "123" });
  
  // Let's send a malformed one
  await testJSON("hello");
}

test();
