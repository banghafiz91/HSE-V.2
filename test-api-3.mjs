async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwMNwiT6YUdO-DiS_wXEx9eSnwQlNC1w79DT7h_8T6Bt_iQ-0qtnuQlVTLRb77GDj0U/exec";
  
  try {
    const res = await fetch(`${url}?action=login&email=test@example.com&password=123`);
    console.log("GET login ->", await res.text());
  } catch (e) {
    console.error(e);
  }

  try {
    const res = await fetch(`${url}?action=login`, {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com", password: "123" })
    });
    console.log("POST json (with action in query) ->", await res.text());
  } catch (e) {
    console.error(e);
  }

  try {
    const formData = new URLSearchParams();
    formData.append("action", "login");
    formData.append("email", "test@example.com");
    formData.append("password", "123");
    
    // In Google Apps Script, POSTing form data correctly sets e.parameters
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    console.log("POST form ->", await res.text());
  } catch (e) {
    console.error(e);
  }
}

test();
