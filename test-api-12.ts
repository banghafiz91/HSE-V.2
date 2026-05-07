async function test() {
  const url = "https://script.google.com/macros/s/AKfycbx9YvkfbI_o2KIFlazaFAQ-8kexHfNr43HLNyobcnJAgRDJzEOs9lQR6U2MCuKJHcl1/exec";
  
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
          action: "register",
          username: "test",
          email: "test@example.com",
          password: "123",
          expired_date: "2027-01-01",
          is_active: "active"
      })
    });
    console.log("OLD API REGISTER Result:", await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
