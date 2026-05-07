async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwMNwiT6YUdO-DiS_wXEx9eSnwQlNC1w79DT7h_8T6Bt_iQ-0qtnuQlVTLRb77GDj0U/exec";
  
  try {
    const res = await fetch(`${url}?action=login&email=test@example.com&password=123`, {
      method: "GET"
    });
    const text = await res.text();
    console.log("GET login result:", text);
  } catch (e) {
    console.error(e);
  }

  try {
    const res = await fetch(`${url}?action=register&username=TestUser&email=test@example.com&password=123&expired_date=2027-01-01`, {
      method: "GET"
    });
    const text = await res.text();
    console.log("GET register result:", text);
  } catch (e) {
    console.error(e);
  }

  try {
    const params = new URLSearchParams();
    params.append("action", "login");
    params.append("email", "test@example.com");
    params.append("password", "123");
    const res = await fetch(url, {
      method: "POST",
      body: params
    });
    const text = await res.text();
    console.log("POST URLEncoded login result:", text);
  } catch (e) {
    console.error(e);
  }
}

test();
