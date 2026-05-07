async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwMNwiT6YUdO-DiS_wXEx9eSnwQlNC1w79DT7h_8T6Bt_iQ-0qtnuQlVTLRb77GDj0U/exec";
  
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ action: "login", email: "test@example.com", password: "123" })
    });
    const text = await res.text();
    console.log("POST login json result:", text);
  } catch (e) {
    console.error(e);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ action: "register", username: "Test User", email: "test@example.com", password: "123", expired_date: "2027-01-01" })
    });
    const text = await res.text();
    console.log("POST register json result:", text);
  } catch (e) {
    console.error(e);
  }
}

test();
