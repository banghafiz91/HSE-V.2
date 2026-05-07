async function test() {
  const url = "https://script.google.com/macros/s/AKfycbyZ9AJ6wYOO5eW6JB0gXa1qjZR5JEi66ijjW8XOLl_P-E62IvVdiPVI-JOG4dDnbr3a/exec";
  const expDate = new Date(); expDate.setFullYear(expDate.getFullYear() + 1);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
          action: "register",
          email: "elhafizh.rahmadhan@gmail.com",
          password: "mysecurepassword123",
          nama: "Elhafizh",
          username: "Elhafizh",
          whatsapp: "628999111222",
          expired_date: expDate.toISOString()
      })
    });
    console.log("Register Result:", await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
