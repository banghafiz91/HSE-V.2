async function test() {
  const url = "https://script.google.com/macros/s/AKfycbx9YvkfbI_o2KIFlazaFAQ-8kexHfNr43HLNyobcnJAgRDJzEOs9lQR6U2MCuKJHcl1/exec";
  
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
          action: "login",
          username: "test",
          password: "123"
      })
    });
    console.log("OLD API LOGIN username Result:", await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
