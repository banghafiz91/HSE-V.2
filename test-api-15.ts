async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwMNwiT6YUdO-DiS_wXEx9eSnwQlNC1w79DT7h_8T6Bt_iQ-0qtnuQlVTLRb77GDj0U/exec";
  
  const payloads = [
    { action: "Login" },
    { action: "Register" },
    { action: "register" },
    { Action: "Register" },
    { action: "Login", email: "test@example.com", password: "123" },
    { ACTION: "LOGIN" },
    { type: "LOGIN" }
  ];

  for(const p of payloads) {
    const res = await fetch(url, { method: "POST", body: JSON.stringify(p) });
    const txt = await res.text();
    if(txt !== '{"error":"Unknown Action"}') {
      console.log("SUCCESS WITH: ", p, txt);
    }
  }
  console.log("Done checking variations.");
}
test();
