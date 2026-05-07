async function test() {
  const url = "https://script.google.com/macros/s/AKfycbx9YvkfbI_o2KIFlazaFAQ-8kexHfNr43HLNyobcnJAgRDJzEOs9lQR6U2MCuKJHcl1/exec";
  
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com", password: "123" })
    });
    const text = await res.text();
    console.log("POST json result:", text);
  } catch (e) {
    console.error(e);
  }
}

test();
