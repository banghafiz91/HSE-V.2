async function test() {
  const url = "https://script.google.com/macros/s/AKfycbyZ9AJ6wYOO5eW6JB0gXa1qjZR5JEi66ijjW8XOLl_P-E62IvVdiPVI-JOG4dDnbr3a/exec";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: JSON.stringify({
          action: "login",
          email: "elhafizh.rahmadhan@gmail.com",
          password: 123
      })
    });
    console.log("Login Result:", await res.text());
  } catch(e) { console.error(e); }
}
test();
